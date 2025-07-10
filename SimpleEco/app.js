import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import errorHandler from "./src/middlewares/errorHandlerMiddleware.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", authMiddleware, cartRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);

app.use(errorHandler);

export default app;
