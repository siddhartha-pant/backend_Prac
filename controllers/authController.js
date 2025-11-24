const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (password.length < 6)
      return res.status(400).json({ error: "Password too short" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const successResBody = {
      message: "successfully logged in",
      data: {
        token: token,
      },
    };
    res.status(200).json(successResBody);
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
