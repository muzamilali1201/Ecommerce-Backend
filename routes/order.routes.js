const Order = require("../models/Order");
const router = require("express").Router();
const {
  orderProduct,
  getOrder,
  listAllOrders,
  updateOrder,
} = require("../controllers/order-controller");
const tokenverification = require("../middlewares/tokenverification");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const { OrderValidationSchema } = require("../utils/validationSchema");
const checkUserRole = require("../middlewares/checkUserRole");

router.post(
  "/",
  [joiSchemaValidation(OrderValidationSchema), tokenverification],
  orderProduct
);
router.get("/:orderId", [tokenverification], getOrder);
router.get("/", [tokenverification], listAllOrders);
router.put("/:orderId", [tokenverification, checkUserRole], updateOrder);

module.exports = router;
