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
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    let payment = await Payment.create({
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

module.exports = { paymentCheckOut };
