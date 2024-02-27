const router = require("express").Router();
const Payment = require("../models/Payment");
const {
  paymentCheckOut,
  paymentSuccess,
} = require("../controllers/payment-controller");
const tokenVerification = require("../middlewares/tokenverification");

router.post("/checkout", [tokenVerification], paymentCheckOut);
router.get("/success/:userid", paymentSuccess);

module.exports = router;
