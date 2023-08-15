const express = require('express');
const { salesController } = require('../controllers');
const salesCreateValidation = require('../middlewares/salesCreateValidation');

const salesRouter = express.Router();
salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', salesCreateValidation, salesController.createSale);
module.exports = salesRouter;