import CartItems from "../models/cartItemsModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const getCartIdByUserId = async (userId) => {
  const cart = await Cart.findOne({ where: { userId } });
  return cart.id;
};

export const getCartItemsdDb = async (userId) => {
  const cartId = await getCartIdByUserId(userId);

  const cartItems = await CartItems.findAll({
    where: { cartId },
    attributes: ["quantity"],
    include: {
      model: Product,
      as: "product",
      attributes: ["id", "name", "price", "stock"],
      required: true,
    },
  });

  const result = cartItems.map(({ product, quantity }) => ({
    productId: product.id,
    productName: product.name,
    quantity,
    stock: product.stock,
    totalPrice: product.price * quantity,
  }));

  const subtotal = result.reduce((sum, item) => sum + item.totalPrice, 0);
  return {
    products: result,
    subtotal,
    no_items: result.length,
  };
};

export const saveCartItems = async (userId, productId, quantity) => {
  const cartId = await getCartIdByUserId(userId);

  return await CartItems.create({
    cartId,
    productId,
    quantity,
  });
};

export const dropCartItem = async (userId, productId) => {
  const cartId = await getCartIdByUserId(userId);

  return await CartItems.destroy({
    where: { cartId, productId },
  });
};

export const getCartItemByProductId = async (userId, productId) => {
  const cartId = await getCartIdByUserId(userId);

  return await CartItems.findOne({
    where: { cartId, productId },
  });
};

export const dropAllCartItemsDb = async (userId, t) => {
  const cartId = await getCartIdByUserId(userId);

  return await CartItems.destroy({
    where: { cartId }, transaction: t
  });
};

export const getSavedForLaterItemsDb = async (userId) => {
  const cartId = await getCartIdByUserId(userId);

  return await CartItems.findAll({
    where: { cartId, isSavedForLater: true },
    attributes: [],
    include: {
      model: Product,
      as: "product",
      attributes: ["id", "name", "price"],
      required: true,
    },
  });
};

export const updateSavedForLaterItemDb = async (
  userId,
  productId,
  isSavedForLater
) => {
  const cartId = await getCartIdByUserId(userId);

  await CartItems.update({ isSavedForLater }, { where: { cartId, productId } });
  return await CartItems.findOne({ where: { cartId, productId } });
};
