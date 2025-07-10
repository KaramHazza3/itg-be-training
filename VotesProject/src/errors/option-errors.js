export class OptionValidationError extends Error {
    constructor(message = "Invalid option data") {
      super(message, 400);
    }
  }
