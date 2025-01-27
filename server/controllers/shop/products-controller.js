const Product = require("../../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");

const getFilteredProducts = async (req, res) => {
  const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

  let filters = {};

  if (category.length) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }

  let sort = {};

  switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;

      break;
    case "price-hightolow":
      sort.price = -1;

      break;
    case "title-atoz":
      sort.title = 1;

      break;

    case "title-ztoa":
      sort.title = -1;

      break;

    default:
      sort.price = 1;
      break;
  }

  const products = await Product.find(filters).sort(sort);

  res.status(StatusCodes.OK).json({
    success: true,
    data: products,
  });
};

const getProductDetails = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return next(new NotFoundError("Product not found!"));

  res.status(StatusCodes.OK).json({
    success: true,
    data: product,
  });
};

module.exports = { getFilteredProducts, getProductDetails };
