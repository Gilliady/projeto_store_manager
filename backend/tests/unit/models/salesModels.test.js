const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModels } = require('../../../src/models');

const { expect } = chai;
const { allSales, salesById } = require('../../mocks/salesMocks');
const { productToInsert } = require('../../mocks/productMocks');

describe('Testando a <SalesModels>', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('<SalesModels> Funcionalidade do endpoint GET "/sales/"', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const allProductResponse = await salesModels.getAll();
    expect(allProductResponse).to.be.an('array');
    expect(allProductResponse).to.deep.equal(allSales);
  });

  it('<SalesModels> Funcionalidade do endpoint GET "/sales/:id"', async function () {
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
  it('<SalesModels> Funcionalidade do endpoint POST "/sales/"', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall()
    .resolves([{ insertId: 1 }])
    .onSecondCall()
    .resolves([{ affectedRows: 2 }]);
    const response = await salesModels.createSale();
    expect(response).to.be.an('number');
    expect(response).to.deep.equal(1);
    const response2 = await salesModels.createSaleProduct(productToInsert, 1);
    expect(response2).to.be.an('number');
    expect(response2).to.deep.equal(2);
  });
});