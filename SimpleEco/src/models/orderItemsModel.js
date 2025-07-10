import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const OrderItem = sequelize.define("OrderItems", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Orders",
      key: "id",
    },
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default OrderItem;
