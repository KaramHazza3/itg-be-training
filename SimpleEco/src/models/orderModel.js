import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Order = sequelize.define("Orders", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'completed', 'cancelled'],
    defaultValue: 'pending',
    allowNull: false,
  },
});

export default Order;
