import { formatDistanceToNow } from 'date-fns';

export const formattedPolls = (polls) =>
   polls.map((poll) => {
    const { id, question, createdAt, options } = poll.dataValues;
    return {
      id,
      question,
      options: options ? options: [],
      createdAt: formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    };
  });

export const formattedPollDetail = (poll) => {
  const {id, question, options} = poll.dataValues;
  const formattedOptions = options.map((option)=> option.dataValues);
  return {
    id,
    question,
    options: formattedOptions
  };
};