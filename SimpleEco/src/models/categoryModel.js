import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Category = sequelize.define('Categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Category;