export class ProductNotFound extends Error {
  constructor(message) {
    super(message);
  }
}

export class ProductExisted extends Error {
  constructor(message) {
    super(message);
  }
}
