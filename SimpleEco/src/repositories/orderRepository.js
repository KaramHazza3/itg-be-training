import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemsModel.js";

export const saveOrderDb = async (userId, totalPrice, t) => {
  return await Order.create({
    userId,
    totalPrice,
  }, {transaction: t});
};

export const saveOrderItemDb = async (orderData, t) => {
  return await OrderItem.create({
    orderId: orderData.orderId,
    productId: orderData.productId,
    quantity: orderData.quantity,
    price: orderData.price
  }, {transaction: t});
};

export const updateOrderStatusDb = async (orderId, status, t) => {
  return await Order.update(
    {status},
    {where: {id: orderId}, transaction: t}
  )
};