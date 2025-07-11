# SimpleEco Backend

A RESTful backend API for an e-commerce platform built with Node.js, Express, and Sequelize ORM using SQLite database.

---

## About

SimpleEco backend provides core e-commerce functionalities including product browsing, cart management, and order checkout. It is built to demonstrate best practices with transaction handling and clean architecture.

---

## Features

- Browse and filter products  
- Add, remove, and update cart items  
- Save cart items for later  
- Place orders with stock validation and transactional safety  

---

## Technologies

- Node.js with Express  
- Sequelize ORM  
- SQLite3 database  
- JSON Web Tokens (JWT) for authentication (not covered here)  
- Bcrypt for password hashing  
- Joi for validation  
- Faker.js for seeding test data  

```markdown

## Database Models

- **User**  
  Fields: `id, username, email, password`

- **Product**  
  Fields: `id, name, description, price, stock, rating, tagId, categoryId`

- **Category**  
  Fields: `id, name`

- **Tag**  
  Fields: `id, name`

- **Cart**  
  Fields: `id, userId`

- **CartItems**  
  Fields: `id, cartId, productId, quantity, isSavedForLater`

- **Order**  
  Fields: `id, userId, totalPrice, status (pending, completed, cancelled)`

- **OrderItem**  
  Fields: `id, orderId, productId, quantity, price`

- **ProductImage**  
  Fields: `id, productId, pathUrl`

---

## Environment Variables

Create a `.env` file at the project root with the following:

```env
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:./database.sqlite
