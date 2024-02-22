const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  name: String,
  title: String,
  url: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
