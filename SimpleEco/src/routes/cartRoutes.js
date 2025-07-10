import express from "express";
import * as cartController from "../controllers/cartController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  addCartItemSchema,
  savedForLaterSchema,
} from "../validations/cartValidations.js";
const router = express.Router();

router.get("/items", cartController.getCartItemsController);
router.get(
  "/savedItems",
  cartController.getSavedForLaterItemsController
);
router.post(
  "/items",
  validateRequest(addCartItemSchema),
  cartController.addCartItemController
);
router.delete(
  "/items/:productId",
  cartController.removeCartItemController
);
router.delete("/items", cartController.removeAllCartItemsController);
router.patch(
  "/items/:productId/saved-for-later",
  validateRequest(savedForLaterSchema),
  cartController.updateSavedForLaterItemController
);

export default router;
