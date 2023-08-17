const express = require('express');
const { productsController } = require('../controllers');
const { validateName,
  validateProductExistence } = require('../middlewares/productsCreateValidation');

const productsRouter = express.Router();
productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.put(
  '/:id',
  validateProductExistence,
  validateName,
  productsController.updateProduct,
);

productsRouter.delete('/:id', validateProductExistence, productsController.deleteProduct);

productsRouter.post('/', validateName, productsController.createProduct);

module.exports = productsRouter;