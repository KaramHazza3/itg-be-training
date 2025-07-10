import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve('src','persistance', 'database.sqlite'),
  });

export default sequelize;