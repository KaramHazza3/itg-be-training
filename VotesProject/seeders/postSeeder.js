import { faker } from '@faker-js/faker';
import Post from '../src/persistance/models/post-model.js'

async function seedPosts(userIds, count = 50) {
    const posts = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        question: faker.internet.userName(),
        email: faker.internet.email(),
        userId: faker.internet.password(),
      });
    }
    await Post.bulkCreate(posts);
    console.log(`${count} users seeded.`);
  }

export default seedPosts;