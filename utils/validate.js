// validation/auth.js
const { body, validationResult } = require("express-validator");

exports.signup = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  // Add more validation rules as needed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware or controller
  },
];
