const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../src/models/connection');

const { expect } = chai;
const { allProducts, productId1 } = require('../mocks/productMocks');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('Teste de Integração"', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').resolves(connection);
  });
  it('Integração do endpoint "/products/"', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const { body, statusCode } = await chai.request(app).get('/products');
    expect(statusCode).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(allProducts);
  });
  it('integração do endpoint "/products/:id"', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productId1]])
      .onSecondCall()
      .resolves([[undefined]]);
    const { body, statusCode } = await chai.request(app).get('/products/1');
    expect(statusCode).to.be.equal(200);
    expect(body).to.be.an('object');
    expect(body).to.deep.equal(productId1);
    const { body: body2, statusCode: statusCode2 } = await chai.request(app).get('/products/10');
    expect(statusCode2).to.be.equal(404);
    expect(body2).to.be.an('object');
    expect(body2).to.deep.equal({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});