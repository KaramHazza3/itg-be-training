import * as productService from "../services/productService.js";
import HTTP_STATUS from "../utils/httpStatus.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProductsController = asyncHandler(async (req, res) => {
  const { query } = req;
  const products =
    Object.keys(query).length > 0
      ? await productService.getProductsByFilters(query)
      : await productService.getAllProducts();
  return res.status(HTTP_STATUS.OK).json(products);
});

export const getProductByIdController = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await productService.getProductById(productId);
  return res.status(HTTP_STATUS.OK).json(product);
});
