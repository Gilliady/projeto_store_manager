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

module.exports = {
  getAll,
  getById,
};
