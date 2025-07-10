import { sequelize, connectDB } from "./dbConnection.js";
import { defineAssociations } from "../models/associations.js";

const setupDatabase = async () => {
  try {
    await connectDB();

    defineAssociations();
    await sequelize.sync({ force: false });
    console.log("Models synced with database");
  } catch (error) {
    console.error("Error setting up database:", error.message);
    process.exit(1);
  }
};

export { setupDatabase };
