const products = require('../models/products.model');

const getAllProducts = async () => {
  const productList = await products.getAll();
  return productList;
};

const getProductById = async (id) => {
  const product = await products.getById(id);
  if (!product) return { message: 'Product not found' };
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
