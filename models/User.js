const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userModel);
