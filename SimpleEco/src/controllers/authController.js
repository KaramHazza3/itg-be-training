import * as authService from "../services/authService.js";
import HTTP_STATUS from "../utils/httpStatus.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await authService.createUser(username, email, password);
  return res.status(HTTP_STATUS.CREATED).json({
    message: "User has been created successfully",
    user: newUser,
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginUser(email, password);
  return res.status(HTTP_STATUS.OK).json({
    message: "Login successfully",
    token: token
  });
});
