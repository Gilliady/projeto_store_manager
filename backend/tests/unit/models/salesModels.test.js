const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const { salesModels } = require('../../../src/models');

const { expect } = chai;
const { allSales, salesById } = require('../../mocks/salesMocks');

describe('Testando a Models quando chamado: "/sales/ e /sales/:id"', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').resolves(connection);
  });
  it('Funcionalidade do endpoint "/sales/"', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const allProductResponse = await salesModels.getAll();
    expect(allProductResponse).to.be.an('array');
    expect(allProductResponse).to.deep.equal(allSales);
  });
  it('Funcionalidade do endpoint "/sales/:id"', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([salesById])
      .onSecondCall()
      .resolves([[]]);
    const response = await salesModels.getById(1);
    expect(response).to.be.an('array');
    expect(response).to.deep.equal(salesById);
    const response2 = await salesModels.getById(1);
    expect(response2).to.have.length(0);
  });
  afterEach(function () {
    sinon.restore();
  });
  sinon.restore();
});