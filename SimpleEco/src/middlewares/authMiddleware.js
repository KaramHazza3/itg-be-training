import jwt from "jsonwebtoken";
import { TokenMissingError, UnauthorizedAccessError } from "../errors/authErrors.js";

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new TokenMissingError());
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new UnauthorizedAccessError(error.message));
  }
};

export default authenticateJWT;
