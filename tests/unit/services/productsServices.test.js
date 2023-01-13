const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const { productsService } = require('./../../../src/services');

const { products, productFindById } = require('./mocks/productsServices.mock');

describe('Testando Service de Produtos', function () {
  describe('Requisito 01 - listar todos os produtos e produto por Id', function () {
    it('Está retornando todos os produtos', async function () {
      // Arrange
      sinon.stub(productsModel, 'findAll').resolves(products);
      // Act
      const result = await productsService.findAll();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(products);
    });

    it('Está retornando produto dado o id', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(productFindById);
      const expectedId = 1;
      // Act
      const result = await productsService.findById(expectedId);
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(productFindById);
    });
    it('Está retornando erro ao inserir id inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const expectedId = 999;
      // Act
      const result = await productsService.findById(expectedId);
      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});