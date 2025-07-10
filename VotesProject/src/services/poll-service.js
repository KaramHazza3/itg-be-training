import {
  getTopPollsDb,
  getRecentPollsDb,
  savePoll,
  getPollByIdDb,
} from "../persistance/repositories/poll-repository.js";
import { createOptions } from "./options-service.js";
import { formattedPolls, formattedPollDetail } from "../mappers/poll-mapper.js";
import sequelize from "../persistance/db-context.js";
import {
  PollNotFoundError,
  PollCreationError,
  PollOptionError
} from "../errors/poll-errors.js";

const MAXIMUM_OPTIONS = 4;
const MINIMUM_OPTIONS = 2;

export const getTopPolls = async () => {
  const topPolls = await getTopPollsDb();

  if (!topPolls || topPolls.length === 0) {
    throw new PollNotFoundError("No top polls available at the moment.");
  }

  return formattedPolls(topPolls);
};

export const getRecentPolls = async () => {
  const recentPolls = await getRecentPollsDb();
  if (!recentPolls || recentPolls.length === 0) {
    throw new PollNotFoundError("No polls have been created yet.");
  }
  return formattedPolls(recentPolls);
};

export const createPoll = async (userId, question, options) => {
  if (options.length < MINIMUM_OPTIONS) {
    throw new PollOptionError("A poll must have at least 2 options.");
  }
  if (options.length > MAXIMUM_OPTIONS) {
    throw PollOptionError("Your poll cannot have more than 4 options");
  }
  const t = await sequelize.transaction();

  try {
    const newPoll = await savePoll(
      {
        userId: userId,
        question: question,
      },
      t
    );

    await createOptions(options, newPoll.id, t);
    await t.commit();

    return newPoll;
  } catch (error) {
    await t.rollback();
    throw new PollCreationError();
  }
};

export const getPollById = async (pollId, includeNoVotes) => {
  const retrievedPoll = await getPollByIdDb(pollId, includeNoVotes);
  if (!retrievedPoll) {
    throw new PollNotFoundError();
  }
  return formattedPollDetail(retrievedPoll);
};