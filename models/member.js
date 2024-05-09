const { types } = require("@babel/core");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  passsword: { type: String, required: true },
  admin: { type: Boolean, default: false },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

module.exports = mongoose.model("Member", memberSchema);
