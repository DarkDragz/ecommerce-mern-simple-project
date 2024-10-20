const Address = require("../../models/Address");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const addAddress = async (req, res, next) => {
  const { userId, address, city, pincode, phone, notes } = req.body;

  if (!userId || !address || !city || !pincode || !phone || !notes) {
    return next(new BadRequestError("Invalid data provided"));
  }

  const newlyCreatedAddress = new Address({
    userId,
    address,
    city,
    pincode,
    notes,
    phone,
  });

  await newlyCreatedAddress.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: newlyCreatedAddress,
  });
};

const fetchAllAddress = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return next(new BadRequestError("UserId is required"));
  }

  const addressList = await Address.find({ userId });

  res.status(StatusCodes.OK).json({
    success: true,
    data: addressList,
  });
};

const editAddress = async (req, res, next) => {
  const { userId, addressId } = req.params;
  const formData = req.body;

  if (!userId || !addressId) {
    return next(new BadRequestError("User and Address Ids are required"));
  }

  const address = await Address.findOneAndUpdate(
    {
      _id: addressId,
      userId,
    },
    formData,
    { new: true }
  );

  if (!address) {
    return next(new NotFoundError("Address Not Found"));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: address,
  });
};

const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  if (!userId || !addressId) {
    return next(new BadRequestError("IUser and Address id are required"));
  }

  const address = await Address.findOneAndDelete({ _id: addressId, userId });

  if (!address) {
    return next(new NotFoundError("Address not found"));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Address deleted successfully",
  });
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
