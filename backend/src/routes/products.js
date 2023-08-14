const express = require('express');
const products = require('../services/products.service');

const productRoute = express.Router();
productRoute.get('/', async (req, res) => {
  const productsList = await products.getAllProducts();
  return res.status(200).json(productsList);
});

productRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await products.getProductById(id);
  if (product.message) return res.status(404).json(product);
 return res.status(200).json(product);
});

module.exports = productRoute;