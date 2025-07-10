import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const CartItems = sequelize.define("CartItems", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Carts",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  isSavedForLater: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  }
}, {
  timestamps: true
});


export default CartItems;