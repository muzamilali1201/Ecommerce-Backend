const Payment = require("../models/Payment");
const Order = require("../models/Order");
const customError = require("../utils/error");
const stripe = require("stripe")(process.env.SECRET_KEY);

const paymentCheckOut = async (req, res) => {
  const userid = req.id;
  const order = await Order.findOne({ userid: userid });

  if (order) {
    let session_url = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: order.products.map((elem) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: elem.name,
            },
            unit_amount: elem.price,
          },
          quantity: elem.quantity,
        };
      }),
      success_url: `http://localhost:3000/api/v1/payment/success/${userid}`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    let payment = await Payment.create({
      userid: userid,
      paymentid: session_url.id,
      payment_mode: session_url.payment_method_types,
      currency: session_url.currency,
      totalprice: session_url.amount_total,
      url: session_url.url,
    });
    if (payment) {
      res.status(200).json({ message: "Payment successfully completed" });
      return;
    }
    throw new customError(500, "Something went wrong");
  }
  throw new customError(404, "Orders not found for this user");
};

const paymentSuccess = async (req, res) => {
  const userid = req.params.userid;
  console.log(userid);
  const payment = await Payment.findOne({ userid: userid });
  if (payment) {
    payment.verified = true;
    await payment.save();
    res.status(200).json({ message: "Payment verified successfully" });
    return;
  }
  throw new customError(404, "Payment for this user not found!");
};

module.exports = { paymentCheckOut, paymentSuccess };
