import * as cartService from "../services/cartService.js";
import asyncHandler from "../utils/asyncHandler.js";
import HTTP_STATUS from "../utils/httpStatus.js";

export const getCartItemsController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const cartItems = await cartService.getCartItems(userId);
  return res.status(HTTP_STATUS.OK).json(cartItems);
});

export const addCartItemController = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;
  const addedCartItem = await cartService.addCartItem(
    userId,
    productId,
    quantity
  );
  return res.status(HTTP_STATUS.CREATED).json(addedCartItem);
});

export const removeCartItemController = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;
  await cartService.removeCartItem(userId, productId);
  return res.status(HTTP_STATUS.OK).json({
    message: "The item has been removed successfully",
  });
});

export const removeAllCartItemsController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  await cartService.removeAllCartItems(userId);
  return res.status(HTTP_STATUS.OK).json({
    message: "All the items have been removed successfully",
  });
});

export const getSavedForLaterItemsController = asyncHandler(
  async (req, res) => {
    const userId = req.user.userId;
    const savedForLaterItems = await cartService.getSavedForLaterItems(userId);
    return res.status(HTTP_STATUS.OK).json(savedForLaterItems);
  }
);

export const updateSavedForLaterItemController = asyncHandler(
  async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { savedForLater } = req.body;
    const item = await cartService.updateSavedForLaterItem(
      userId,
      productId,
      savedForLater
    );
    return res.status(HTTP_STATUS.OK).json(item);
  }
);
