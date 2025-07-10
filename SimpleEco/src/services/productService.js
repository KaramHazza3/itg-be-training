import * as productRepository from "../repositories/productRepository.js";
import { ProductNotFound } from "../errors/productErrors.js";

export const getAllProducts = async () => {
  return await productRepository.getProductsDb();
};

export const getProductsByFilters = async (filters) => {
  return await productRepository.getProductsDb(filters);
};

export const getProductById = async (productId) => {
  const product = await productRepository.getProductByIdDb(productId);
  if (!product) {
    throw new ProductNotFound("Product not found");
  }
  return product;
};

export const updateProductStock = async (productId, orderedQuantity, t) => {
  return await productRepository.updateProductStockDb(productId, orderedQuantity, t);
};