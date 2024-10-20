const { StatusCodes } = require("http-status-codes");
const { handleImageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");
const { NotFoundError } = require("../../errors");

const handleImageUpload = async (req, res) => {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const url = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await handleImageUploadUtil(url);

  res.status(StatusCodes.OK).json({
    success: true,
    result,
  });
};

//add a new product
const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  const newlyCreatedProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  });

  await newlyCreatedProduct.save();
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: newlyCreatedProduct,
  });
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    data: listOfProducts,
  });
};

//edit a product
const editProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;
  let findProduct = await Product.findById(id);
  if (!findProduct) {
    return next(new NotFoundError("Product not found"));
  }

  findProduct.title = title || findProduct.title;
  findProduct.description = description || findProduct.description;
  findProduct.category = category || findProduct.category;
  findProduct.brand = brand || findProduct.brand;
  findProduct.price = price === "" ? 0 : price || findProduct.price;
  findProduct.salePrice =
    salePrice === "" ? 0 : salePrice || findProduct.salePrice;
  findProduct.totalStock = totalStock || findProduct.totalStock;
  findProduct.image = image || findProduct.image;
  findProduct.averageReview = averageReview || findProduct.averageReview;

  await findProduct.save();
  res.status(StatusCodes.OK).json({
    success: true,
    data: findProduct,
  });
};

//delete a product
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) return next(new NotFoundError("Product not found"));

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product delete successfully",
  });
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
