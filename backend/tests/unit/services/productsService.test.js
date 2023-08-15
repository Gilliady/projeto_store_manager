const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const { productsServices } = require('../../../src/services');
const { productModels } = require('../../../src/models');

const { expect } = chai;
const { allProducts, productId1 } = require('../../mocks/productMocks');

describe('SERVICES GET /products', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').returns(connection);
  });
  it('testando se a rota "/products" retorna um array', async function () {
    sinon.stub(connection, 'execute')
    .resolves([allProducts]);
    sinon.stub(productModels, 'getAll')
    .resolves(allProducts);
    const { status, data } = await productsServices.getAllProducts();
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(allProducts);
  });
  it('testando se a rota "/products/1 retorna um objeto', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[productId1]]);
    sinon.stub(productModels, 'getById').resolves(productId1);
    const id = 1;
    const { status, data } = await productsServices.getProductById(id);
    expect(status).to.be.equal(200);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(productId1);
  });
  it('testando se a rota "/products/10" retorna um erro', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[undefined]]);
    sinon.stub(productModels, 'getById').resolves(undefined);
    const id = 10;
    const { status, data } = await productsServices.getProductById(id);
    expect(status).to.be.equal(404);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });
  this.afterEach(function () {
    sinon.restore();
  });
  sinon.restore();
});