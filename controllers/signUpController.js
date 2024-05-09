const Member = require("../models/member");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.createMember_get = (req, res, next) => {
  res.render("sign-up");
};

exports.createMember_post = asyncHandler(async (req, res, next) => {});
