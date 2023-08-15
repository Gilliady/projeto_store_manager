const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const { allSales, salesById } = require('../../mocks/salesMocks');

chai.use(sinonChai);
const { expect } = chai;
describe('Teste unitário do controller Sales', function () {
  afterEach(function () {
    sinon.reset();
  });
  it('Testa getAllSales Controller', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(allSales),
    };
    sinon.stub(salesServices, 'getAll')
    .resolves({ status: 200, data: allSales });
    const response = await salesController.getAll({}, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(response).to.be.deep.equal(allSales);
  });
  it('Testa getByIdSales Controller', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
        .onFirstCall()
        .returns(salesById)
        .onSecondCall()
        .returns({ message: 'Sale not found' }),
    };
    sinon.stub(salesServices, 'getById')
      .onFirstCall()
      .resolves({ status: 200, data: salesById })
      .onSecondCall()
      .resolves({ status: 404, data: { message: 'Sale not found' } });
    let response = await salesController.getById({ params: { id: 1 } }, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(response).to.be.deep.equal(salesById);
    response = await salesController.getById({ params: { id: 999 } }, res);
    expect(res.status).to.have.been.calledWith(404);
    console.log(response);
    expect(response).to.be.deep.equal({ message: 'Sale not found' });
  });
});