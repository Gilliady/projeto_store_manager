const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const { salesServices } = require('../../../src/services');
const { salesModels } = require('../../../src/models');

const { expect } = chai;
const { allSales, salesById, newSaleMock } = require('../../mocks/salesMocks');
const { productToInsert } = require('../../mocks/productMocks');

describe('<SalesServices>', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').returns(connection);
  });

  it('<SalesServices> testando funcionalidade quando executada a getAll bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([allSales]);
    sinon.stub(salesModels, 'getAll')
    .resolves(allSales);
    const { status, data } = await salesServices.getAll();
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(allSales);
  });

  it('<SalesServices> testando funcionalidade quando executada getById bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([salesById]);
    sinon.stub(salesModels, 'getById').resolves(salesById);
   
    const id = 1; 
    const { status, data } = await salesServices.getById(id);
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(salesById);
  });

  it('<SalesServices testando funcionalidade quando executada getById mal sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([undefined]);
    sinon.stub(salesModels, 'getById').resolves([]);
    const id = 10;
    const { status, data } = await salesServices.getById(id);
    expect(status).to.be.equal(404);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('<SalesServices> testando funcionalidade quando executada createSale bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([1]);
    sinon.stub(salesModels, 'createSale').resolves(1);
    sinon.stub(salesModels, 'createSaleProduct').resolves(2);
    const { status, data } = await salesServices.createSale(productToInsert);
    expect(status).to.be.equal(201);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(newSaleMock);
  });

  it('<SalesServices> testando funcionalidade quando executada createSale mal sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([1]);
    sinon.stub(salesModels, 'createSale')
    .onFirstCall()
    .resolves(1)
    .onSecondCall()
    .resolves(undefined);
    sinon.stub(salesModels, 'createSaleProduct').resolves(1);
    const { status, data } = await salesServices.createSale(productToInsert);
    expect(status).to.be.equal(500);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Server Error' }); 
    const { status: status2, data: data2 } = await salesServices.createSale(productToInsert);
    expect(status2).to.be.equal(500);
    expect(data2).to.be.an('object');
    expect(data2).to.be.deep.equal({ message: 'Server Error' });
  });
  this.afterEach(function () {
    sinon.restore();
  });
});