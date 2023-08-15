const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/productsCreateValidation');

const productsRouter = express.Router();
productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', validateName, productsController.createProduct);

module.exports = productsRouter;