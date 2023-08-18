const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const { allSales, salesById } = require('../../mocks/salesMocks');

chai.use(sinonChai);
const { expect } = chai;
describe('<SalesController>', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('<SalesController> getAll', async function () {
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
  it('<SalesController> getById', async function () {
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
    expect(response).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('<SalesController> createSale', async function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 10,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ id: 1, itemsSold: req.body }),
    };
    sinon.stub(salesServices, 'createSale')
      .resolves({ status: 201, data: { id: 1, itemsSold: req.body } });
    const response = await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(response).to.be.deep.equal({ id: 1, itemsSold: req.body });
  });
});