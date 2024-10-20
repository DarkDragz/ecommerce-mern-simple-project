const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) return next(new UnauthenticatedError("Token has Expired"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

//admin access

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.role !== "admin") {
    return next(
      new UnauthenticatedError("You are not authorized to access this route")
    );
  }
  next();
};
module.exports = { authMiddleware, isAdmin };
