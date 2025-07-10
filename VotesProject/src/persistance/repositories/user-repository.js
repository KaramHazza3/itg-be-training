import User from "../models/user-model.js";

export const saveUser = async (userData) => {
  return await User.create(userData);
};

export const getUserByEmail = async (userEmail) => {
  return await User.findOne({ where: { email: userEmail } });
};
