const router = require("express").Router();
const tokenverification = require("../middlewares/tokenverification");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const { CartValidationSchema } = require("../utils/validationSchema");
const {
  addToCart,
  removeFromCart,
  updateCart,
  viewCart,
} = require("../controllers/cart-controller");

router.post(
  "/add/:productId",
  [tokenverification, joiSchemaValidation(CartValidationSchema)],
  addToCart
);
router.post("/remove/:productId", [tokenverification], removeFromCart);
router.post("/update/:productId", [tokenverification], updateCart);
router.get("/all", [tokenverification], viewCart);

module.exports = router;
