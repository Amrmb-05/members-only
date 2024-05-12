const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.becomeMember_get = asyncHandler(async (req, res, next) => {
  res.render("member-form", { user: req.user });
});
