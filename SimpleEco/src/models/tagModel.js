import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Tag = sequelize.define('Tags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Tag;