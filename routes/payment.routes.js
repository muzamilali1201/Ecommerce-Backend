const router = require("express").Router();
const Payment = require("../models/Payment");
const { paymentCheckOut } = require("../controllers/payment-controller");
const tokenVerification = require("../middlewares/tokenverification");

router.post("/checkout", [tokenVerification], paymentCheckOut);

module.exports = router;
