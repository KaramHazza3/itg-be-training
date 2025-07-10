import Options from "../models/option-model.js";

export const createOptionsDb = async (options, t) => {
    await Options.bulkCreate(options, {transaction: t});
};

export const addVoteToOptionDb = async (optionId, t) => {
    const option = await Options.findByPk(optionId, { transaction: t });
    await option.increment('no_votes', { by: 1, transaction: t });
    await option.reload({ transaction: t });
};

export const getOptionByIdDb = async (optionId) => {
    return await Options.findByPk(optionId);
};