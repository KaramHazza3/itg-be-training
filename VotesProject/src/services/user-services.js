import {
  saveUser,
  getUserByEmail,
} from "../persistance/repositories/user-repository.js";
import { createUserDTO } from "../dtos/userDTO.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { UserAlreadyExistsError, InvalidCredentialsError, PasswordMismatchError } from '../errors/user-errors.js';
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (username, email, password, password2) => {
  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    throw new UserAlreadyExistsError();
  }

  if (password !== password2) {
    throw new PasswordMismatchError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await saveUser({
    userName: username,
    email,
    password: hashedPassword,
  });

  return createUserDTO(newUser);
};

export const loginUser = async (email, password) => {
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new InvalidCredentialsError();
  }
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }
  const token = jsonwebtoken.sign(
    existingUser.dataValues,
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};
