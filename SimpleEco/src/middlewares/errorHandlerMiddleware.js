import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  TokenMissingError,
  UnauthorizedAccessError,
} from "../errors/authErrors.js";
import { ProductNotFound, ProductExisted } from "../errors/productErrors.js";
import { CartEmpty, CartItemOutOfStock } from "../errors/orderErrors.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err instanceof UserAlreadyExistsError) {
    statusCode = 409;
    errorMessage = err.message;
  } else if (err instanceof InvalidCredentialsError) {
    statusCode = 401;
    errorMessage = err.message;
  } else if (err instanceof ProductNotFound) {
    statusCode = 404;
    errorMessage = err.message;
  } else if (err instanceof ProductExisted) {
    statusCode = 409;
    errorMessage = err.message;
  } else if (err instanceof TokenMissingError) {
    statusCode = 401;
    errorMessage = err.message;
  } else if (err instanceof UnauthorizedAccessError) {
    statusCode = 403;
    errorMessage = err.message;
  } else if (err instanceof CartEmpty) {
    statusCode = 400;
    errorMessage = err.message;
  } else if (err instanceof CartItemOutOfStock) {
    statusCode = 409;
    errorMessage = err.message;
  }
  
  res.status(statusCode).json({
    error: errorMessage,
  });
};

export default errorHandler;
