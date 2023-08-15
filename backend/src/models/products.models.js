// const snakeize = require('snakeize');
const camelize = require('camelize');

const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',  
    [id],
  );
  return camelize(product);
};
module.exports = {
  getAll,
  getById,
};
