export class VoteOptionMissingError extends Error {
  constructor(message = "Option ID is missing in the request body") {
    super(message, 400);
  }
}

export class UserAlreadyVotedError extends Error {
  constructor(message = "User has already voted for this poll") {
    super(message, 400);
  }
}
