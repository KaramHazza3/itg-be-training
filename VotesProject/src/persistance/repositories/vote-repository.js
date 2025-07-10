import Vote from "../models/vote-model.js";
import Options from "../models/option-model.js";

export const saveVoteDb = async (voteData, t) => {
    return await Vote.create(voteData, {transaction: t});
};

export const getUserVotedPollDb = async (userId, pollId) => {
    return await Vote.findOne({
        attributes: ['id', 'userId', 'options.id', 'options.pollId'],
        where: { 'userId': userId },
        include: {
            model: Options,
            as: "options",
            required: true,
            where: {
                pollId: pollId
            }
        }
    });
}