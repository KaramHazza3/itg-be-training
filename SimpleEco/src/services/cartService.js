import * as cartRepository from "../repositories/cartRepository.js";
import { ProductExisted, ProductNotFound } from "../errors/productErrors.js";
import { getProductById } from "./productService.js";

export const getCartItems = async (userId) => {
  return await cartRepository.getCartItemsdDb(userId);
};

export const addCartItem = async (userId, productId, quantity) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ProductNotFound("Product not found");
  }
  const isProductExisted = await cartRepository.getCartItemByProductId(
    userId,
    productId
  );
  if (isProductExisted)
    throw new ProductExisted("The product is already added in the cart");
  return await cartRepository.saveCartItems(userId, productId, quantity);
};

export const removeCartItem = async (userId, productId) => {
  const isProductExisted = await cartRepository.getCartItemByProductId(
    userId,
    productId
  );
  if (!isProductExisted) throw new ProductNotFound("Product doesn't exist");
  return await cartRepository.dropCartItem(userId, productId);
};

export const removeAllCartItems = async (userId, t) => {
  return await cartRepository.dropAllCartItemsDb(userId, t);
};

export const getSavedForLaterItems = async (userId) => {
  return await cartRepository.getSavedForLaterItemsDb(userId);
};

export const updateSavedForLaterItem = async (
  userId,
  productId,
  savedForLater
) => {
  const item = cartRepository.getCartItemByProductId(userId, productId);
  if (!item) {
    throw new ProductNotFound("Product doesn't exist");
  }
  return await cartRepository.updateSavedForLaterItemDb(
    userId,
    productId,
    savedForLater
  );
};
