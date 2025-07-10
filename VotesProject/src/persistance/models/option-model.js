import { DataTypes } from "sequelize";
import  sequelize  from "../db-context.js";

const Options = sequelize.define('Options', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Polls',
            key: 'id',
        },
    },
    no_votes:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

export default Options;