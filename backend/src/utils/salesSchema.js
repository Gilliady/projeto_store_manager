const joi = require('joi');

const requireds = joi.object().keys({
  productId: joi.number().required(),
  quantity: joi.number().required().min(1),
}).messages({
  'any.required': '{#label} is required',
  'number.min': '{#label} must be greater than or equal to 1',
});

module.exports = requireds;