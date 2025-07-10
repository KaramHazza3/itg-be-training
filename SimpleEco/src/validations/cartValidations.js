import Joi from "joi";

export const addCartItemSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

export const savedForLaterSchema = Joi.object({
  savedForLater: Joi.number().valid(0, 1).required(),
});