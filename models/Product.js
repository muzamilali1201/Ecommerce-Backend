const mongoose = require("mongoose");

const Product = mongoose.Schema({
  userid: String,
  name: String,
  price: Number,
  description: String,
  category: String,
});

module.exports = mongoose.model("Product", Product);
