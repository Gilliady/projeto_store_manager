const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const productService = require('../../../src/services/products.service');

const { expect } = chai;
const { allProducts, productId1 } = require('../../mocks/productMocks');

describe.only('SERVICES GET /products', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').returns(connection);
  });
  it('testando se a rota "/products" retorna um array', async function () {
    sinon.stub(connection, 'execute')
    .resolves([allProducts]);
    const response = await productService.getAllProducts();
    expect(response).to.be.an('array');
    expect(response).to.be.deep.equal(allProducts);
  });
  it('testando se a rota "/products/1 retorna um objeto', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[productId1]]);
    const id = 1;
    const response = await productService.getProductById(id);
    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal(productId1);
  });
  it('testando se a rota "/products/10" retorna um erro', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[undefined]]);
    const id = 10;
    const response = await productService.getProductById(id);
    expect(response).to.be.an('object');
    expect(response).to.be.deep.equal({ message: 'Product not found' });
  });
  this.afterEach(function () {
    sinon.restore();
  });
});