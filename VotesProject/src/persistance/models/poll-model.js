import { DataTypes } from "sequelize";
import sequelize from "../db-context.js";
import Option from "./option-model.js";

const Poll = sequelize.define('Polls', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [10, Infinity],
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  }
});

Poll.hasMany(Option, { as: 'options', foreignKey: 'pollId', onDelete: 'CASCADE' });
Option.belongsTo(Poll, { foreignKey: 'pollId', as:'poll'});

export default Poll;
