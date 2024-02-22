const Review = require("../models/Reviews");
const customeError = require("../utils/error");
const addReview = async (req, res) => {
  const userId = req.id;
  const productId = req.params.productId;
  const { review, comment } = req.body;

  const reviewCheck = await Review.findOne({ userId: userId });
  if (reviewCheck) {
    throw new customeError(403, "Review already exist");
  }

  const reviewToAdd = await Review.create({
    userId,
    productId,
    review,
    comment,
  });
  if (reviewToAdd) {
    res.status(200).json({ message: "Review added successfully!" });
    return;
  }
  throw new customeError(500, "Something went wrong!");
};

const GetReview = async (req, res) => {
  const productId = req.params.productId;
  const searchedReview = await Review.findOne({ productId: productId });
  if (searchedReview) {
    res.status(200).json({
      SearchedReview: searchedReview,
    });
    return;
  }
  throw new customeError(500, "Something went wrong!");
};

module.exports = { addReview, GetReview };
