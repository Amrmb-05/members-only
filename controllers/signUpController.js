const Member = require("../models/member");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.createMember_get = (req, res, next) => {
  res.render("sign-up");
};

exports.createMember_post = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name can not be empty ")
    .isAlpha()
    .withMessage("Name should only contain alphabet characters")
    .escape(),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name can not be empty ")
    .isAlpha()
    .withMessage("Name should only contain alphabet characters")
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("User name can not be empty ")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 7 })
    .withMessage("Password must contain atleast 7 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // Create member object with escaped and trimmed data

    const member = new Member({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render("/sign-up", {
        member: member,
        errors: errors.array(),
      });
    } else {
      await member.save();
      res.redirect("/sign-in");
    }
  }),
];
