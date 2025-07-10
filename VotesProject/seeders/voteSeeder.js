import { faker } from '@faker-js/faker';
import Vote from '../src/persistance/models/vote-model.js';
import User from '../src/persistance/models/user-model.js';
import Option from '../src/persistance/models/option-model.js';

const seedVotes = async (userIds, optionIds, count = 100) => {
  const votes = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const optionId = faker.helpers.arrayElement(optionIds);
    votes.push({
      userId: userId,
      optionId: optionId,
    });
  }
  await Vote.bulkCreate(votes);

  for (const optionId of optionIds) {
    const voteCount = votes.filter(vote => vote.optionId === optionId).length;
    if (voteCount > 0) {
      await Option.increment('no_votes', { by: voteCount, where: { id: optionId } });
    }
  }

  console.log(`${count} votes seeded.`);
};

export default seedVotes;
