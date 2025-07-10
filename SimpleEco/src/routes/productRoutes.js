import * as productController from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.get("", productController.getProductsController);
router.get("/:id", productController.getProductByIdController);

export default router;
