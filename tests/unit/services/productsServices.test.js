const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const { productsService } = require('./../../../src/services');

const { products } = require('./mocks/productsServices.mock');

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

    it('Está retornando produto dado o id', function () {
      // Arrange

      // Act

      // Assert
    });
    it('Está retornando erro ao inserir id inválido', function () {
      // Arrange

      // Act

      // Assert
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});