const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const messageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

messageSchema.virtual("deleteUrl").get(function () {
  return `/delete/${this._id}`;
});

messageSchema.virtual("timeAgo").get(function () {
  const timeAgo = moment(this.createdAt.toISOString()).fromNow();
  return timeAgo;
});
module.exports = mongoose.model("Message", messageSchema);
