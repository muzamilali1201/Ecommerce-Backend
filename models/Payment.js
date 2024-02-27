const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    paymentid: String,
    userid: String,
    payment_mode: Array,
    currency: String,
    totalprice: Number,
    url: String,
    verified: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
