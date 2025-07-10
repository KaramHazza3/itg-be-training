import * as orderRepository from "../repositories/orderRepository.js";
import { getCartItems, removeAllCartItems } from "./cartService.js";
import { updateProductStock } from "./productService.js";
import { CartEmpty, CartItemOutOfStock } from "../errors/orderErrors.js";
import { sequelize } from "../config/dbConnection.js";

export const checkout = async (userId) => {
  const t = await sequelize.transaction();
  try {
    const cart = await getCartItems(userId);

    if (!cart || !cart.products || cart.products.length === 0) {
      throw new CartEmpty("The cart is empty");
    }

    for (const product of cart.products) {
      if (product.quantity > product.stock) {
        throw new CartItemOutOfStock(`Product ${product.productName} is out of stock, There are ${product.stock} reminaing available`);
      }
    }

    const order = await orderRepository.saveOrderDb(userId, cart.subtotal, t);

    for (const product of cart.products) {
      let orderData = {
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.totalPrice,
      };

      await orderRepository.saveOrderItemDb(orderData, t);
      await updateProductStock(product.productId, product.quantity, t);
    }

    await removeAllCartItems(userId, t);
    await orderRepository.updateOrderStatusDb(order.id, "completed", t);
    await t.commit();

  } catch (error) {
    await t.rollback();
    console.error("Checkout failed:", error.message);
    throw error;
  }
};
