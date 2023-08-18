const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');
const { allProducts, productId1 } = require('../../mocks/productMocks');

chai.use(sinonChai);
const { expect } = chai;

const produtoTeste = {
  name: 'Produto Teste',
};

describe('<ProductController>', function () {
  it('<ProductController> testando funcionalidade da getAll quando sucesso na services.', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(allProducts),
    };
    sinon.stub(productsServices, 'getAllProducts').resolves({ status: 200, data: allProducts });
    const response = await productsController.getAll(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(response).to.be.deep.equal(allProducts);
  });
  it('<ProductController> testando funcionalidade da getById quando deu sucesso na services.', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(productId1),
    };
    sinon.stub(productsServices, 'getProductById').resolves({ status: 200, data: productId1 });
    const response = await productsController.getById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(response).to.be.deep.equal(productId1);
  });
  it('<ProductController> testando funcionalidade da createProduct quando sucesso na services', async function () {
    const req = {
      body: produtoTeste,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ id: 1, name: 'Produto Teste' }),
    };
    sinon.stub(productsServices, 'createProduct').resolves({ status: 201, data: { id: 1, ...req.body } });
    const response = await productsController.createProduct(req, res);
    expect(res.status).to.be.calledWith(201);
    expect(response).to.be.deep.equal({ id: 1, ...produtoTeste });
  });

  it('<ProductController> testando funcionalidade da updateProduct quando sucesso na services', async function () {
    const req = {
      params: { id: 1 },
      body: produtoTeste,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ id: 1, ...produtoTeste }),
    };
    sinon.stub(productsServices, 'updateProduct').resolves({ status: 200, data: { id: 1, ...req.body } });
    const response = await productsController.updateProduct(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(response).to.be.deep.equal({ id: 1, ...produtoTeste });
  });

  it('<ProductController> testando funcionalidade da deleteProduct quando sucesso na services', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns({ id: 1, ...produtoTeste }),
      end: sinon.stub().returnsThis(),
    };
    sinon.stub(productsServices, 'deleteProduct').resolves({ status: 204 });
    const response = await productsController.deleteProduct(req, res);
    expect(res.status).to.be.calledWith(204);
    expect(response).to.be.deep.equal(undefined);
  });
});