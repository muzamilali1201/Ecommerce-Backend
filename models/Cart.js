const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  price: Number,
  description: String,
  category: String,
  quantity: {
    type: Number,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema(
  {
    userId: String,
    items: [productSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Cart", cartSchema);
