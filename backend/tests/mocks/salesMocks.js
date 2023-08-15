const date = '2023-08-15T18:05:35.000Z';
const allSales = [
  {
    saleId: 1,
    productId: 1,
    date,
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    date,
    quantity: 10,
  },
  {
    saleId: 2,
    productId: 3,
    date,
    quantity: 15,
  },
];

const salesById = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  allSales,
  salesById,
};
