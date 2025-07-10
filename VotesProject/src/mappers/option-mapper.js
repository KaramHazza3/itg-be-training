export const formattedOption = (option) => {
    const { createdAt, updatedAt, pollId, ...formattedOption } = option.dataValues;
    return formattedOption;
};