const mongoose = require("mongoose");
const joi = require("joi");

const userModel = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("User", userModel);
