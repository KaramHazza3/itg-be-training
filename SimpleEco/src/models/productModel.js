import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";


const Product = sequelize.define('Products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
        defaultValue: 1
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tags',
            key: 'id',
        },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

export default Product;