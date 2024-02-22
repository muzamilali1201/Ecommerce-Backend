const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: String,
  price: Number,
  description: String,
  category: String,
  quantity: {
    type: Number,
    default: 0,
  },
});

const orderSchema = mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    products: [productSchema],
    shippingaddress: {
      street: String,
      country: String,
      state: String,
      city: String,
      postal: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
