const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');
const generateDate = require('../utils/generateDate');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, product_id, date, quantity FROM sales
    INNER JOIN sales_products AS sp ON sp.sale_id = sales.id;`,
    );
  return camelize(sales);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id
    WHERE s.id = ?`,
    [id],
  );
  return camelize(sale);
};

const createSale = async () => {
  const date = generateDate();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return insertId;
};

const createSaleProduct = async (products, saleId) => {
  const keysArray = `(${Object.keys(snakeize(products[0])).join(', ')}, sale_id)`;
  const interrogationsArray = products
    .map((product) => `(${Object.values(product).map(() => '?').join(', ')}, ?)`);
    const valuesArray = products.map((product) => [...Object.values(product), saleId]);
  const [{ affectedRows }] = await connection.execute(
    `INSERT INTO sales_products ${keysArray} VALUES ${interrogationsArray}`,
    [].concat(...valuesArray),
  );
  return camelize(affectedRows);
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProduct,
};
