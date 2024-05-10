const Member = require("../models/member");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {
  res.render("login.ejs");
};
