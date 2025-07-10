export class PollNotFoundError extends Error {
  constructor(message = "Poll not found") {
    super(message, 404);
  }
}

export class PollCreationError extends Error {
  constructor(message = "There was an issue creating the poll") {
    super(message, 400);
  }
}

export class PollOptionError extends Error {
  constructor(message = "Poll must have between 2 and 4 options") {
    super(message, 400);
  }
}