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

exports.createMessage_post = [
  body("title", "Title can not be empty.").trim().isLength({ min: 1 }).escape(),
  body("text", "Message can not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user,
      date: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.render("new-message", {
        message: message,
        author: req.user,
        errors: errors.array(),
      });
      console.log(errors.array());
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];

exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate("author").exec();
  res.render("index", { user: req.user, messages: messages });
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
