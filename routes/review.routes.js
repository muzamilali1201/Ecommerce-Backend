const router = require("express").Router();
const { addReview, GetReview } = require("../controllers/review-controller");
const tokenverification = require("../middlewares/tokenverification");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const { ReviewValidationSchema } = require("../utils/validationSchema");

router.post(
  "/:productId",
  [tokenverification, joiSchemaValidation(ReviewValidationSchema)],
  addReview
);
router.get("/:productId", [tokenverification], GetReview);

module.exports = router;
