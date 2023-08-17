const { productModels } = require('../models');
const nameSchema = require('../utils/nameSchema');

const validateName = (req, res, next) => {
  const validation = nameSchema.validate(req.body);
  if (validation.error) {
    const { message } = validation.error.details[0];
    return res
      .status(message === '"name" is required' ? 400 : 422)
      .json({ message });
  }
  return next();
};

const validateProductExistence = async (req, res, next) => {
  const { params: { id } } = req;
  const product = await productModels.getById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateName,
  validateProductExistence,
};
