const chai = require('chai');
const sinon = require('sinon');
const mysql2 = require('mysql2/promise');
const connection = require('../../../src/models/connection');
const { salesServices } = require('../../../src/services');
const { salesModels } = require('../../../src/models');

const { expect } = chai;
const { allSales, salesById } = require('../../mocks/salesMocks');

describe('SERVICES GET AQUI /sales', function () {
  beforeEach(function () {
    sinon.stub(mysql2, 'createConnection').returns(connection);
  });
  it('testando se a rota "/sales" retorna um array', async function () {
    sinon.stub(connection, 'execute')
    .resolves([allSales]);
    sinon.stub(salesModels, 'getAll')
    .resolves(allSales);
    const { status, data } = await salesServices.getAll();
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(allSales);
  });
  it('testando se a rota "/sales/1 retorna um array tamanho 2', async function () {
    sinon.stub(connection, 'execute')
    .resolves([salesById]);
    sinon.stub(salesModels, 'getById').resolves(salesById);
   
    const id = 1; 
    const { status, data } = await salesServices.getById(id);
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(salesById);
  });
  it('testando se a rota "/sales/10" retorna um erro', async function () {
    sinon.stub(connection, 'execute')
    .resolves([undefined]);
    sinon.stub(salesModels, 'getById').resolves([]);
    const id = 10;
    const { status, data } = await salesServices.getById(id);
    expect(status).to.be.equal(404);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });
  this.afterEach(function () {
    sinon.restore();
  });
});