import User from "./userModel.js";
import Product from "./productModel.js";
import Tag from "./tagModel.js";
import Category from "./categoryModel.js";
import CartItems from "./cartItemsModel.js";
import ProductImage from "./productImages.js";
import Cart from "./cartModel.js";
import Order from "./orderModel.js";
import OrderItem from "./orderItemsModel.js";

const defineAssociations = () => {
  User.hasOne(Cart, { as: "cart", foreignKey: "userId" });
  Cart.belongsTo(User, { as: "user", foreignKey: "userId" });

  Cart.belongsToMany(Product, {
    through: CartItems,
    foreignKey: "cartId",
    as: "cartItems",
  });

  Product.belongsTo(Tag, { as: "productTag", foreignKey: "tagId" });
  Product.belongsTo(Category, {
    as: "productCategory",
    foreignKey: "categoryId",
  });
  Product.belongsToMany(Cart, {
    through: CartItems,
    foreignKey: "cartId",
    as: "userCarts",
  });

  Product.hasMany(ProductImage, {
    as: "productImages",
    foreignKey: "productId",
  });

  ProductImage.belongsTo(Product, { as: "product", foreignKey: "productId" });

  Category.hasMany(Product, {
    as: "products",
    foreignKey: "categoryId",
    onDelete: "CASCADE",
  });

  Tag.hasMany(Product, { as: "products", foreignKey: "tagId" });

  CartItems.belongsTo(Cart, { foreignKey: "cartId", as: "userCart" });
  CartItems.belongsTo(Product, { foreignKey: "productId", as: "product" });

  Order.hasMany(OrderItem, { as: "items", foreignKey: "orderId" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId" });
};

export { defineAssociations };
