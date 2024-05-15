const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.createUser_get = (req, res, next) => {
  res.render("sign-up", { errors: {} });
};

exports.createUser_post = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name must contain atleast 1 character ")

    .escape(),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must contain atleast 1 character")
    .escape(),
  body("username")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .escape()
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("A user already exists with this e-mail address");
      }
    }),
  body("password")
    .isLength({ min: 7 })
    .withMessage("Password must contain atleast 7 characters.")
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .withMessage("Passwords must match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // Create user object with escaped and trimmed data

    const user = new User({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach((error) => {
        extractedErrors[error.path] = error.msg;
      });

      res.render("sign-up", {
        user: user,
        errors: extractedErrors,
      });
    } else {
      await user.save();
      res.redirect("/login");
    }
  }),
];
