const { productModels } = require('../models');
const salesSchema = require('../utils/salesSchema');

const validateRequiredFields = (req, res, next) => {
  const { body } = req;
  const responses = body.map((item) => salesSchema.validate(item));
  const error = responses.find((item) => item.error);
  if (error) {
    const { message } = error.error.details[0];
    return res.status(message.includes('required') ? 400 : 422).json({ message });
  }
  next();
};

const validateProductExistence = async (req, res, next) => {
  const { body } = req;
  const responses = await Promise.all(body.map(async (item) => {
    const product = await productModels.getById(item.productId);
    return !product ? null : product;
  }));
  if ((responses).some((item) => item === null)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = [
  validateRequiredFields,
  validateProductExistence,
];