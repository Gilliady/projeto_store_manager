const { productModels } = require('../models');

const getAllProducts = async () => {
  const productList = await productModels.getAll();
  return { status: 200, data: productList };
};

const getProductById = async (id) => {
  const product = await productModels.getById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

const createProduct = async (name) => {
  const product = await productModels.createProduct(name);
  return { status: 201, data: product };
};

const updateProduct = async (id, name) => {
  const product = await productModels.updateProduct(id, name);
  return { status: 200, data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
