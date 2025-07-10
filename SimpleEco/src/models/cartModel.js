import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Cart = sequelize.define('Carts', {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default Cart;