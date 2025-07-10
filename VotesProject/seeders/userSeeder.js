import { faker } from '@faker-js/faker';
import User from '../src/persistance/models/user-model.js'

const seedUsers = async (count = 50) => {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push({
        userName: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
    await User.bulkCreate(users);
    console.log(`${count} users seeded.`);
  };

export default seedUsers;