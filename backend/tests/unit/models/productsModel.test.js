const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');

const { expect } = chai;
const { allProducts, productId1 } = require('../../mocks/productMocks');
const app = require('../../../src/app');

chai.use(chaiHttp);

describe('Testando as rotas "/products/ e /products/:id"', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').resolves(connection);
  });
  it('Funcionalidade do endpoint "/products/"', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const { body, statusCode } = await chai.request(app).get('/products');
    expect(statusCode).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(allProducts);
  });
  it('Funcionalidade do endpoint "/products/:id"', async function () {
    sinon.stub(connection, 'execute')
      .resolves([[productId1]]);
      console.log('Teste');
    const { body, statusCode } = await chai.request(app).get('/products/1');
    expect(statusCode).to.be.equal(200);
    expect(body).to.be.an('object');
    expect(body).to.deep.equal(productId1);
  });
  afterEach(function () {
    sinon.restore();
  });
});