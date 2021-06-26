/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");

// signup validator
exports.signupValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 8",
  ).matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/),
];

// signin validator
exports.signinValidator = [check("email", "Invalid email").isEmail().normalizeEmail()];

exports.sellerValidator = [check("email", "Invalid email").isEmail().normalizeEmail()];

// seller validator
exports.sellerValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
};
