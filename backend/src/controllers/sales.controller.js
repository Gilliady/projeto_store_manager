const { salesServices } = require('../services');

const getAll = async (_req, res) => {
  const { status, data } = await salesServices.getAll();
  return res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.getById(id);
  return res.status(status).json(data);
};

module.exports = {
  getAll,
  getById,
};
