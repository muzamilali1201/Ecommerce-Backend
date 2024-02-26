const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    paymentid: String,
    payment_mode: Array,
    currency: String,
    totalprice: Number,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
