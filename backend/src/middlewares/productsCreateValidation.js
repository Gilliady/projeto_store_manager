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
module.exports = [
  validateName,
];
