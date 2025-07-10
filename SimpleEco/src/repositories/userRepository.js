import User from "../models/userModel.js";

export const saveUser = async (userData) => {
  return await User.create(userData);
};

export const getUserByEmail = async (userEmail) => {
  return await User.findOne({ where: { email: userEmail } });
};