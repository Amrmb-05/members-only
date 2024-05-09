const Member = require("../models/member");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.addMember_get = (req, res, next) => {
  res.render("sign-up");
};
