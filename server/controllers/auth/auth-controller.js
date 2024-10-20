const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!email || !password || !userName) {
    return next(
      new BadRequestError("Please provide username, email and password")
    );
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // Set a cookie with the token
  res.cookie("auth", token, {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript (for security)
    secure: true, // Ensures the cookie is only sent over HTTPS (in production)
    sameSite: "None", // Enables cross-origin cookies (if you're making cross-origin requests)
    maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User Created Successfully",
    user: {
      email: user.email,
      id: user._id,
      role: user.role,
      userName: user.userName,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Please provide email and password"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new UnauthenticatedError("Invalid Credentials"));
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new UnauthenticatedError("Invalid Credentials"));
  }
  const token = user.createJWT();

  res.cookie("auth", token, {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript (for security)
    secure: true, // Ensures the cookie is only sent over HTTPS (in production)
    sameSite: "None", // Enables cross-origin cookies (if you're making cross-origin requests)
    maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day
  });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User Logged In Successfully",
    user: {
      email: user.email,
      id: user._id,
      role: user.role,
      userName: user.userName,
    },
  });
};

const logout = async (_req, res) => {
  res.clearCookie("auth").status(StatusCodes.OK).json({
    success: true,
    message: "User logged out successfully",
  });
};

module.exports = { register, login, logout };
