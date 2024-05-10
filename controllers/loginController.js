const Member = require("../models/member");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {
  res.render("login");
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});
