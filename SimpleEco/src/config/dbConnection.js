import { Sequelize } from "sequelize";
import path from "path";
import { __dirname } from "../../pathUtils.js";
import fs from "fs";

const dataDir = path.resolve(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "data", "database.sqlite"),
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
