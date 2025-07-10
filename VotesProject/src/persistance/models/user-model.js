import { DataTypes } from "sequelize";
import  sequelize  from "../db-context.js";
import Poll from "./poll-model.js";
const User = sequelize.define('Users', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Poll, { foreignKey: 'userId', as: 'polls', onDelete: 'CASCADE' });
Poll.belongsTo(User, { foreignKey: 'userId' });

export default User;