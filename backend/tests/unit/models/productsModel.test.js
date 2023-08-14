const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;
const { allProducts, productId1 } = require('../../mocks/productMocks');

describe('Testando as rotas "/products/ e /products/:id"', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').resolves(connection);
  });
  it('Funcionalidade do endpoint "/products/"', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const allProductResponse = await productsModel.getAll();
    expect(allProductResponse).to.be.an('array');
    expect(allProductResponse).to.deep.equal(allProducts);
  });
  it('Funcionalidade do endpoint "/products/:id"', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productId1]])
      .onSecondCall()
      .resolves([[undefined]]);
    const response = await productsModel.getById(1);
    expect(response).to.be.an('object');
    expect(response).to.deep.equal(productId1);
    const response2 = await productsModel.getById(1);
    expect(response2).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});