import { saveVoteDb, getUserVotedPollDb } from "../persistance/repositories/vote-repository.js";
import { addVoteToOption, getOptionById } from "../services/options-service.js";
import sequelize from "../persistance/db-context.js";
import { VoteOptionMissingError } from '../errors/vote-errors.js';
import { io } from "../../server.js";

export const createVote = async (voteData) => {

    if (!voteData.optionId) {
        throw new VoteOptionMissingError();
    }
    const t = await sequelize.transaction();

    try {
        const vote = await saveVoteDb(voteData, t);
        await addVoteToOption(voteData.optionId, t);
        await t.commit();
        const updatedOption = await getOptionById(voteData.optionId);
        io.emit("voteUpdate", updatedOption); 
        return vote;
    } catch (err){
        await t.rollback();
        throw err;
    }
};

export const getUserVotedPoll = async (userId, pollId) => {
    if(!pollId) {
        throw new Error("Poll ID is required to check if the user has voted.");
    }
    return await getUserVotedPollDb(userId, pollId);
};