const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const { status, data } = await productsServices.getAllProducts();
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.getProductById(id);
 return res.status(status).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsServices.createProduct(name);
  return res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { params: { id }, body: { name } } = req;
  const { status, data } = await productsServices.updateProduct(id, name);
  return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status } = await productsServices.deleteProduct(id);
  res.status(status).end();
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
