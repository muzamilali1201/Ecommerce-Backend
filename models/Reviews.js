const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  productId: {
    type: String,
  },
  review: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
