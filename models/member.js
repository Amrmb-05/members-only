const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const memberSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

memberSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = this.first_name + this.last_name;
  }
  return fullname;
});

memberSchema.pre("save", async function (next) {
  const member = this;

  member.password = await bcrypt.hash(member.password, 10);
  next();
});

module.exports = mongoose.model("Member", memberSchema);
