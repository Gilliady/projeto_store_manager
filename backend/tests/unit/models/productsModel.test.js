const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModels } = require('../../../src/models');

const { expect } = chai;
const { allProducts, productId1, productInsertId } = require('../../mocks/productMocks');

describe('Testando as rotas "/products/ e /products/:id"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('<ProductModels>Funcionalidade do endpoint GET "/products/"', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const allProductResponse = await productModels.getAll();
    expect(allProductResponse).to.be.an('array');
    expect(allProductResponse).to.deep.equal(allProducts);
  });
  
  it('<ProductModels>Funcionalidade do endpoint GET "/products/:id"', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productId1]])
      .onSecondCall()
      .resolves([[undefined]]);
    const response = await productModels.getById(1);
    expect(response).to.be.an('object');
    expect(response).to.deep.equal(productId1);
    const response2 = await productModels.getById(99);
    expect(response2).to.be.equal(undefined);
  });
  
  it('<ProductModels>Funcionalidade do endpoint POST "/products/"', async function () {
    sinon.stub(connection, 'execute').resolves([productInsertId]);
    const response = await productModels.createProduct('Teste');
    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ id: 1, name: 'Teste' });
  });

  it('<ProductModels> Funcionalidade do endpoint PUT "/product/:id"', async function () {
    sinon.stub(connection, 'execute').resolves();
    const response = await productModels.updateProduct(1, 'Produto Teste');
    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ name: 'Produto Teste', id: 1 });
  });

  it('<ProductModels> Funcionalidade do endpoint DELETE "/product/:id"', async function () {
    sinon.stub(connection, 'execute').resolves();
    const response = await productModels.deleteProduct(1);
    expect(response).to.be.an('undefined');
  });
});