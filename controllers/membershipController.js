const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.becomeMember_get = asyncHandler(async (req, res, next) => {
  res.render("member-form", { user: req.user });
});

exports.becomeMember_post = [
  body("member-passcode").escape(),

  asyncHandler(async (req, res, next) => {
    // Check if the user entered the correct passcode
    if (req.body.member_passcode === process.env.MEMBER_PASSCODE) {
      const member = await User.findOneAndUpdate(
        { username: req.user.username },
        { member: true },
        { new: true },
      );
      res.redirect("/");
    } else {
      res.render("member-form", {
        user: req.user,
      });
    }
  }),
];

exports.becomeAdmin_get = asyncHandler(async (req, res, next) => {
  res.render("admin-form", { user: req.user });
});
