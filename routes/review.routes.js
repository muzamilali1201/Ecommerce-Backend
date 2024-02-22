const router = require("express").Router();
const { addReview, GetReview } = require("../controllers/review-controller");
const tokenverification = require("../middlewares/tokenverification");

router.post("/:productId", [tokenverification], addReview);
router.get("/:productId", [tokenverification], GetReview);

module.exports = router;
