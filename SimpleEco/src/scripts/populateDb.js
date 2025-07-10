import { faker } from '@faker-js/faker';
import { sequelize } from '../config/dbConnection.js';
import User from '../models/userModel.js';
import Tag from '../models/tagModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import Cart from '../models/cartModel.js';
import CartItems from '../models/cartItemsModel.js';
import ProductImage from '../models/productImages.js';

const generateFakeData = async () => {
  try {
    await sequelize.sync({ force: true });

    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = await Category.create({ name: faker.commerce.department() });
      categories.push(category);
    }

    const tags = [];
    for (let i = 0; i < 5; i++) {
      const tag = await Tag.create({ name: faker.lorem.word() });
      tags.push(tag);
    }

    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      const cart = await Cart.create({ userId: user.id });
      users.push({ user, cart });
    }

    const products = [];
    for (let i = 0; i < 10; i++) {
      const product = await Product.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 10, max: 100 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        rating: faker.number.int({ min: 1, max: 5 }),
        tagId: faker.helpers.arrayElement(tags).id,
        categoryId: faker.helpers.arrayElement(categories).id,
      });
      products.push(product);

      const numberOfImages = faker.number.int({ min: 2, max: 5 }); 
      for (let i = 0; i < numberOfImages; i++) {
        await ProductImage.create({
          pathUrl: `https://via.placeholder.com/500x500?text=Product+${product.id}+Image+${i + 1}`,
          productId: product.id,
        });
      }
    }

    for (let { user, cart } of users) {
      const randomProductCount = faker.number.int({ min: 1, max: 5 });
      const randomProducts = faker.helpers.arrayElements(products, randomProductCount);

      let totalPrice = 0;
      for (let product of randomProducts) {
        const count = faker.number.int({ min: 1, max: 3 });
        totalPrice += product.price * count;

        await CartItems.create({
          cartId: cart.id,
          productId: product.id,
          quantity: count,
          isSavedForLater: faker.datatype.boolean(),
        });
      }
    }

    console.log('Database populated with fake data!');
    console.log(await sequelize.getQueryInterface().showAllTables());
    await sequelize.close();
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

generateFakeData();
