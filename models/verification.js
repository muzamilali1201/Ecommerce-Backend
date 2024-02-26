const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
  userid: String,
  code: String,
  expireAt: {
    type: Date,
    default: Date.now(),
    expires: 36000,
  },
});

module.exports = mongoose.model("Verification", verificationSchema);
