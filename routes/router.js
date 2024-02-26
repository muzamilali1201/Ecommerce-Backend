// Importing routes
const user = require("../routes/user.routes");
const product = require("../routes/product.routes");
const order = require("../routes/order.routes");
const cart = require("../routes/cart.routes");
const review = require("../routes/review.routes");
const upload = require("../routes/upload.routes");
const payment = require("../routes/payment.routes");

// Importing express router
const router = require("express").Router();

// Using user routes
router.use("/user", user);
// Using product routes
router.use("/products", product);
// Using order routes
router.use("/orders", order);
// Using cart routes
router.use("/cart", cart);
// Using review routes
router.use("/reviews", review);
// Using Upload review routes
router.use("/uploads", upload);

router.use("/payment", payment);
module.exports = router;
