# SimpleEco Backend

A RESTful backend API for an e-commerce platform built with Node.js, Express, and Sequelize ORM using SQLite database.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
  - [Cart](#cart)
  - [Order Checkout](#order-checkout)
- [Database Models](#database-models)
- [Transactions & Error Handling](#transactions--error-handling)
- [Environment Variables](#environment-variables)

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
### Cart

> All cart endpoints require authentication. User ID is extracted from `req.user`.

- `GET /cart`  
  Retrieve current user's cart items.

- `POST /cart`  
  Add a product to the cart. Request body: `{ productId, quantity }`.

- `DELETE /cart/:productId`  
  Remove a specific product from the cart.

- `DELETE /cart`  
  Remove all items from the cart.

- `GET /cart/saved-for-later`  
  Retrieve items marked as "saved for later".

- `PATCH /cart/saved-for-later/:productId`  
  Update saved-for-later status of a cart item. Request body: `{ savedForLater: boolean }`.

---

### Order Checkout

- `POST /orders/checkout`  
  Places an order for the current user's cart.  
  Validates stock availability, creates order and order items, updates product stock, and clears the cart — all inside a database transaction.

---

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
