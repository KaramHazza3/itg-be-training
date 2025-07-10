import { saveUser, getUserByEmail } from "../repositories/userRepository.js";
import { UserDTO } from "../dtos/userDTO.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
} from "../errors/authErrors.js";
import dotenv from "dotenv";
import Cart from "../models/cartModel.js";

dotenv.config();

export const createUser = async (username, email, password) => {
  const foundedUser = await getUserByEmail(email);
  if (foundedUser) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await saveUser({
    username,
    email,
    password: hashedPassword,
  });

  return UserDTO(newUser);
};

export const loginUser = async (email, password) => {
  const foundedUser = await getUserByEmail(email);
  if (!foundedUser) {
    throw new InvalidCredentialsError();
  }
  const isValidPassword = await bcrypt.compare(password, foundedUser.password);
  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }
  const userId = foundedUser.id;
  // let userCart = await Cart.findOne({ where: { userId } });
  // if (!userCart) {
  //   userCart = await Cart.create({ userId });
  // }
  const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
