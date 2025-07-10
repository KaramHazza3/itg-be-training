import {createOptionsDb,addVoteToOptionDb,getOptionByIdDb} from "../persistance/repositories/option-repository.js";
import { formattedOption } from "../mappers/option-mapper.js";
import {OptionValidationError} from "../errors/option-errors.js";

export const createOptions = async (options, pollId, t) => {
  if (!options) {
    throw new OptionValidationError("Options are required to create new poll options.");
  }

  if (!pollId) {
    throw new OptionValidationError("Poll ID is required to associate options with a poll.");
  }

  if (!Array.isArray(options)) {
    throw new OptionValidationError("The 'options' parameter must be an array of strings.");
  }

  const optionsToAdd = options
    .filter((option) => option.length > 0)
    .map((option) => ({
      text: option,
      pollId: pollId,
    }));

  if (optionsToAdd.length === 0) {
    throw new OptionValidationError("No valid options were provided. Please ensure each option has text.");
  }

  await createOptionsDb(optionsToAdd, t);
};

export const addVoteToOption = async (optionId, t) => {
  if (!optionId) {
    throw new OptionValidationError("Option ID is required to record a vote.");
  }

  if (typeof optionId !== "number") {
    throw new OptionValidationError("Option ID must be a valid number.");
  }

  await addVoteToOptionDb(optionId, t);
};

export const getOptionById = async (optionId) => {
  const retrievedOption =  await getOptionByIdDb(optionId);
  return formattedOption(retrievedOption);
}