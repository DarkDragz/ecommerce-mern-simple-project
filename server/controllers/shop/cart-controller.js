const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity <= 0) {
    return next(new BadRequestError("Invalid data provided"));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new NotFoundError("Product Not found"));
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const findCurrentProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (findCurrentProductIndex === -1) {
    cart.items.push({ productId, quantity });
  } else {
    cart.items[findCurrentProductIndex].quantity += quantity;
  }

  await cart.save();
  res.status(StatusCodes.OK).json({
    success: true,
    data: cart,
  });
};

const fetchCartItems = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new BadRequestError("UserId is mandatory"));
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image title price salePrice",
  });

  if (!cart) {
    return next(new NotFoundError("Cart not found!"));
  }

  const validItems = cart.items.filter((productItem) => productItem.productId);

  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }

  const populateCartItems = validItems.map((item) => ({
    productId: item.productId._id,
    image: item.productId.image,
    title: item.productId.title,
    price: item.productId.price,
    salePrice: item.productId.salePrice,
    quantity: item.quantity,
  }));

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

const updateCartItemQty = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity <= 0) {
    return next(new BadRequestError("Invalid data provided"));
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return next(new NotFoundError("Cart not found!"));
  }

  const findCurrentProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (findCurrentProductIndex === -1) {
    return next(new NotFoundError("Cart item not present !"));
  }

  cart.items[findCurrentProductIndex].quantity = quantity;
  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "image title price salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : "Product not found",
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

const deleteCartItem = async (req, res, next) => {
  const { userId, productId } = req.params;
  if (!userId || !productId) {
    return next(new BadRequestError("Invalid data provided"));
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image title price salePrice",
  });

  if (!cart) {
    return next(new NotFoundError("Cart not found!"));
  }

  cart.items = cart.items.filter(
    (item) => item.productId._id.toString() !== productId
  );

  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "image title price salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : "Product not found",
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
