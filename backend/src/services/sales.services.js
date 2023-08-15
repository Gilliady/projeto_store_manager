const { salesModels } = require('../models');

const getAll = async () => {
  const sales = await salesModels.getAll();
  if (!sales) return { status: 500, data: { message: 'Server Error' } };
  return { status: 200, data: sales };
};

const getById = async (id) => {
  const sale = await salesModels.getById(id);
  if (!sale || sale.length === 0) return { status: 404, data: { message: 'Sale not found' } };
  return { status: 200, data: sale };
};

const createSale = async (itensSold) => {
  const sale = await salesModels.createSale(itensSold);
  if (!sale) return { status: 500, data: { message: 'Server Error' } };
  const insertIds = itensSold.map(async (item) => {
    const insertId = await salesModels.createSaleProduct(item, sale);
    if (!insertId) return 'error';
    return insertId;
  });
  if (insertIds.some((id) => id === 'error')) {
    return { 
    status: 500,
    data: { message: 'Server Error' },
    };
  }
  return {
    status: 201,
    data: { id: sale, itemsSold: itensSold.map((item) => ({ ...item })),
    },
  };
};

module.exports = {
  getAll,
  getById,
  createSale,
};