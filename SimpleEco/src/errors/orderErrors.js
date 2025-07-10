export class CartEmpty extends Error {
  constructor(message) {
    super(message);
  }
};

export class CartItemOutOfStock extends Error {
  constructor(message) {
    super(message);
  }
};