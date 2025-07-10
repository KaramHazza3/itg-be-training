export class UserAlreadyExistsError extends Error {
    constructor(message = "Email is already registered") {
      super(message, 409);
    }
  }
  
  export class InvalidCredentialsError extends Error {
    constructor(message = "Email or password are invalid") {
      super(message, 401);
    }
  }
  
  export class PasswordMismatchError extends Error {
    constructor(message = "Passwords do not match") {
      super(message, 400);
    }
  }