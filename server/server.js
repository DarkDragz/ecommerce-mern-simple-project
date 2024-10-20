require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dbConnector = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authMiddleware, isAdmin } = require("./middleware/authentication");
const authRouter = require("./routes/auth-routes");
const adminProductRouter = require("./routes/admin-product-routes");
const adminOrderRouter = require("./routes/admin-order-routes");
const shoppingProductRouter = require("./routes/product-routes");
const searchRouter = require("./routes/search-routes");
const cartRouter = require("./routes/cart-routes");
const addressRouter = require("./routes/address-routes");
const orderRouter = require("./routes/order-routes");
const reviewRouter = require("./routes/review-routes");
const commonRouter = require("./routes/common-routes");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("tiny"));
//Routing

//Auth Routes
app.use(`${process.env.API_URI}/auth`, authRouter);
app.use(
  `${process.env.API_URI}/admin/products`,
  authMiddleware,
  isAdmin,
  adminProductRouter
);
app.use(
  `${process.env.API_URI}/admin/orders`,
  authMiddleware,
  isAdmin,
  adminOrderRouter
);
app.use(
  `${process.env.API_URI}/shop/products`,
  authMiddleware,
  shoppingProductRouter
);
app.use(`${process.env.API_URI}/shop/cart`, authMiddleware, cartRouter);
app.use(`${process.env.API_URI}/shop/address`, authMiddleware, addressRouter);
app.use(`${process.env.API_URI}/shop/order`, authMiddleware, orderRouter);
app.use(`${process.env.API_URI}/shop/search`, authMiddleware, searchRouter);
app.use(`${process.env.API_URI}/shop/review`, authMiddleware, reviewRouter);

app.use(`${process.env.API_URI}/common/feature`, authMiddleware, commonRouter);

//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startApp = async () => {
  try {
    const port = process.env.PORT || 3000;
    await dbConnector();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log("server didn't run properly:", error);
  }
};

startApp();
