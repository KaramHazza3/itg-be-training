import express from "express";
import * as authController from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../validations/userValidations.js";
const router = express.Router();

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.loginController
);
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.registerController
);

export default router;
