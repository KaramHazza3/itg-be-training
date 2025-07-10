import Product from "../models/productModel.js";
import Tag from "../models/tagModel.js";
import Category from "../models/categoryModel.js";
import ProductImages from "../models/productImages.js";
import { Op } from "sequelize";

export const getProductsDb = async (filters = {}) => {
  const whereConditions = {};

  if (filters.price_min)
    whereConditions.price = { [Op.gte]: filters.price_min };
  if (filters.price_max)
    whereConditions.price = { [Op.lte]: filters.price_max };

  if (filters.rating_min)
    whereConditions.rating = { [Op.gte]: filters.rating_min };
  if (filters.rating_max)
    whereConditions.rating = { [Op.lte]: filters.rating_max };

  return await Product.findAll({
    attributes: ["id", "name", "description", "rating", "price"],
    include: [
      {
        model: Tag,
        as: "productTag",
        where: filters.tag ? { name: filters.tag } : undefined,
        attributes: ["name"],
        required: true,
      },
      {
        model: Category,
        as: "productCategory",
        where: filters.category ? { name: filters.category } : undefined,
        attributes: ["name"],
        required: true,
      },
    ],
    where:
      Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
  });
};

export const getProductByIdDb = async (productId) => {
  return await Product.findOne({
    where: { id: productId },
    attributes: ["id", "name", "description", "rating", "price", "stock"],
    include: [
      {
        model: Tag,
        as: "productTag",
        attributes: ["name"],
      },
      {
        model: Category,
        as: "productCategory",
        attributes: ["name"],
      },
      {
        model: ProductImages,
        as: "productImages",
        attributes: ["pathUrl"],
      },
    ],
  });
};

export const updateProductStockDb = async (productId, orderedQuantity, t) => {
  const product = await Product.findByPk(productId);
  const updatedStock = product.stock - orderedQuantity;
  return await Product.update(
    { stock: updatedStock },
    { where: { id: productId }, transaction: t },
  );
};