const joi = require('joi');

const schema = joi.object().keys({
  name: joi.string().min(5).required(),
}).messages({
  'string.min': '"name" length must be at least 5 characters long',
  'string.empty': '"name" length must be at least 5 characters long',
  'any.required': '"name" is required',
});

module.exports = schema;
