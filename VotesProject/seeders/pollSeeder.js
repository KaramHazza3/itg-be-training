import { faker } from '@faker-js/faker';
import Poll from '../src/persistance/models/poll-model.js'; 
import User from '../src/persistance/models/user-model.js';

const seedPolls = async (userIds, count = 30) => {
  const polls = [];
  const currentDate = new Date();
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    polls.push({
      question: faker.lorem.sentence(),
      userId: userId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
  
  await Poll.bulkCreate(polls);
  console.log(`${count} polls seeded.`);
};

export default seedPolls;
