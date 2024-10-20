const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

  const order = await Order.findOne({
    userId,
    "cartItems.productId": productId,
    // orderStatus: "confirmed" || "delivered",
  });

  if (!order) {
    return res.status(403).json({
      success: false,
      message: "You need to purchase product to review it.",
    });
  }

  const checkExistingReview = await ProductReview.findOne({
    productId,
    userId,
  });

  if (checkExistingReview) {
    return res.status(400).json({
      success: false,
      message: "You already reviewed this product!",
    });
  }

  const newReview = new ProductReview({
    productId,
    userId,
    userName,
    reviewMessage,
    reviewValue,
  });

  await newReview.save();

  const reviews = await ProductReview.find({ productId });
  const totalReviewsLength = reviews.length;
  const averageReview =
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
    totalReviewsLength;

  await Product.findByIdAndUpdate(productId, { averageReview });

  res.status(201).json({
    success: true,
    data: newReview,
  });
};

const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  const reviews = await ProductReview.find({ productId });
  res.status(200).json({
    success: true,
    data: reviews,
  });
};

module.exports = { addProductReview, getProductReviews };
