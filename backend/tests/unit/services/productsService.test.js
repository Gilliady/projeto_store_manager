const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsServices } = require('../../../src/services');
const { productModels } = require('../../../src/models');

const { expect } = chai;
const { allProducts, productId1, productInsertId } = require('../../mocks/productMocks');

const product = {
  name: 'Produto Teste',
};
const productReturn = {
  id: 1,
  name: 'Produto Teste',
};
describe('<ProductServices>', function () {
  this.afterEach(function () {
    sinon.restore();
  });
  it('<ProductServices> testando funcionalidade da quando execudada a getAllProducts.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([allProducts]);
    sinon.stub(productModels, 'getAll')
    .resolves(allProducts);
    const { status, data } = await productsServices.getAllProducts();
    expect(status).to.be.equal(200);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(allProducts);
  });
  
  it('<ProductServices> testando funcionalidade quando executada getProductById bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[productId1]]);
    sinon.stub(productModels, 'getById').resolves(productId1);
    const id = 1;
    const { status, data } = await productsServices.getProductById(id);
    expect(status).to.be.equal(200);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(productId1);
  });
  
  it('<ProductServices> testando funcionalidade quando executada getProductById mal sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([[undefined]]);
    sinon.stub(productModels, 'getById').resolves(undefined);
    const id = 10;
    const { status, data } = await productsServices.getProductById(id);
    expect(status).to.be.equal(404);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('<ProductServices> testando funcionalidade quando executada createProduct bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([productInsertId]);
    sinon.stub(productModels, 'createProduct').resolves(productReturn);
    const { status, data } = await productsServices.createProduct(product);
    expect(status).to.be.equal(201);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(productReturn);
  });
  
  it(' <ProductServices> testando funcionalidade quando executada updateProduct bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([productInsertId]);
    sinon.stub(productModels, 'updateProduct').resolves(productReturn);
    const { status, data } = await productsServices.updateProduct(1, product);
    expect(status).to.be.equal(200);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(productReturn);
  });

  it('<ProductServices> testando funcionalidade quando executada deleteProduct bem sucedida na Models.', async function () {
    sinon.stub(connection, 'execute')
    .resolves([productInsertId]);
    sinon.stub(productModels, 'deleteProduct').resolves(productReturn);
    const { status } = await productsServices.deleteProduct(1);
    expect(status).to.be.equal(204);
  });
});