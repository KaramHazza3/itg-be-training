import sequelize from '../src/persistance/db-context.js';
import seedUsers from './userSeeder.js';
import seedPolls from './pollSeeder.js';
import seedOptions from './optionSeeder.js';
import seedVotes from './voteSeeder.js';
import User from '../src/persistance/models/user-model.js';
import Poll from '../src/persistance/models/poll-model.js';
import Options from '../src/persistance/models/option-model.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Seed users
    await seedUsers(50);

    // Fetch user IDs
    const users = await User.findAll({ attributes: ['id'] });
    const userIds = users.map(user => user.id);

    // Seed polls
    await seedPolls(userIds, 30);

    // Fetch poll IDs
    const polls = await Poll.findAll({ attributes: ['id'] });
    const pollIds = polls.map(poll => poll.id);

    // Seed options
    await seedOptions(pollIds);

    // Fetch option IDs
    const options = await Options.findAll({ attributes: ['id'] });
    const optionIds = options.map(option => option.id);

    // Seed votes
    await seedVotes(userIds, optionIds, 400);

    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
