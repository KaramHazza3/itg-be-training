import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const ProductImage = sequelize.define("ProductImages", {
  pathUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },
});

export default ProductImage;
