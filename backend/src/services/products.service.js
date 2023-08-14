const { productsModel } = require('../models');

const getAllProducts = async () => {
  const productList = await productsModel.getAll();
  return productList;
};

const getProductById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { message: 'Product not found' };
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
