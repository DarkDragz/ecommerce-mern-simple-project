const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  const orders = await Order.find({});

  if (!orders.length) {
    return res.status(404).json({
      success: false,
      message: "No orders found!",
    });
  }

  res.status(200).json({
    success: true,
    data: orders,
  });
};

const getOrderDetailsForAdmin = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!",
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!",
    });
  }

  await Order.findByIdAndUpdate(id, { orderStatus });

  res.status(200).json({
    success: true,
    message: "Order status is updated successfully!",
  });
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
