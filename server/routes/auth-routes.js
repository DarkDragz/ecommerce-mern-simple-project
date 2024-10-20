const express = require("express");
const {
  register,
  login,
  logout,
  authMiddleware,
} = require("../controllers/auth/auth-controller");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
