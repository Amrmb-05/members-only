const User = require("../models/user");
const Message = require("../models/messages");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.createMessage_get = (req, res, next) => {
  if (req.user) {
    res.render("new-message", { author: req.user });
  } else {
    res.redirect("/");
  }
};
