import Poll from "../models/poll-model.js";
import Options from "../models/option-model.js";
import sequelize from "../db-context.js";

export const getRecentPollsDb = async () => { // updated_at better to use
  const recentPolls = await Poll.findAll({
    attributes: ["id", "question", "createdAt"],
    include: [
      {
        model: Options,
        as: "options",
        attributes: ["text", "no_votes"],
        required: true,
      },
    ],
    order: [["createdAt", "DESC"]],
    subQuery: false,
  });
  return recentPolls;
};

export const getTopPollsDb = async () => { // use promise all (fetch the database all in parallel)

  const topPolls = await Poll.findAll({
    attributes: [
      "id",
      "question",
      "createdAt",
      [sequelize.fn("SUM", sequelize.col("options.no_votes")), "vote_count"],
    ],
    include: [
      { model: Options, as: "options", attributes: [], required: true },
    ],
    group: ["polls.id"],
    order: [[sequelize.literal("vote_count"), "DESC"]],
    limit: 3,
    subQuery: false,
  });

  let pollsWithOptions = [];

  for (const poll of topPolls) {
    const pollWithOption = await Poll.findOne({
      where: { id: poll.id },
      attributes: ["id", "question", "createdAt"],
      include: [
        {
          model: Options,
          as: "options",
          attributes: ["id", "text", "no_votes"],
          required: true,
        },
      ],
    });
    pollsWithOptions.push(pollWithOption);
  }
  return pollsWithOptions;
};


export const savePoll = async (pollData, t) => {
  const existingPoll = await Poll.findOne({
    where: { question: pollData.question },
  });

  if (existingPoll) {
    throw new Error("Poll with this question already exists");
  }

  return await Poll.create(pollData, { transaction: t });
};

export const getPollByIdDb = async (polldId, includeVotes = false) => {
  let optionAttributes = ["id", "text"];

  if (includeVotes) {
    optionAttributes.push("no_votes");
  }

  return await Poll.findByPk(polldId, {
    attributes: ["id","question"],
    include: [
      {
        model: Options,
        as: "options",
        attributes: optionAttributes,
        required: true,
      },
    ],
    subQuery: false
  });
};