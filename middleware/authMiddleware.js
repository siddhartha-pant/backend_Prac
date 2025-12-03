const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log("we are immediately here");
    console.error(err.name, err.message);
    res.status(400).json({ error: "Invalid token" });
  }
}; //entire middlewares are made using mongoose commands, not regex
