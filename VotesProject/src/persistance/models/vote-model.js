import { DataTypes } from "sequelize";
import sequelize  from "../db-context.js";
import User from "./user-model.js";
import Options from "./option-model.js";

const Vote = sequelize.define('Votes', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    optionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Options',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

User.hasMany(Vote, { foreignKey: 'userId', as: 'votes', onDelete: 'CASCADE' });
Vote.belongsTo(User, { foreignKey: 'userId', as:'user' });
Options.hasMany(Vote, { foreignKey: 'optionId', as: 'votes', onDelete: 'CASCADE' });
Vote.belongsTo(Options, { foreignKey: 'optionId', as:'options' });

export default Vote;