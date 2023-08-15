const camelize = require('camelize');
const connection = require('./connection');

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
  const date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return insertId;
};

const createSaleProduct = async (products, saleId) => {
  const { productId, quantity } = products;
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?)',
    [productId, quantity, saleId],
  );
  return camelize(insertId);
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProduct,
};
