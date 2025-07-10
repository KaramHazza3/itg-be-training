import { faker } from '@faker-js/faker';
import Option from '../src/persistance/models/option-model.js'; 
import Poll from '../src/persistance/models/poll-model.js';

const seedOptions = async (pollIds) => {
  const options = [];
  
  for (const pollId of pollIds) {
    for (let i = 0; i < 4; i++) {
      options.push({
        text: faker.lorem.word(),
        pollId: pollId,
      });
    }
  }

  await Option.bulkCreate(options);
  console.log(`${pollIds.length * 4} options seeded.`);
};

export default seedOptions;
