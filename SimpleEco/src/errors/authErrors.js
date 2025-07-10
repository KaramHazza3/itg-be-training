export class UserAlreadyExistsError extends Error {
  constructor(message = "This email is already registered") {
    super(message);
  }
}
export class InvalidCredentialsError extends Error {
  constructor(message = "Email or password are invalid") {
    super(message);
  }
}

export class TokenMissingError extends Error {
  constructor(message = "Token missing or invalid") {
    super(message);
  }
}

export class UnauthorizedAccessError extends Error {
  constructor(message = "Unauthorized access") {
    super(message);
  }
}
