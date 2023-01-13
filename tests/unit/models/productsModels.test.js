const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { products } = require('./mocks/productsModels.mock');

describe('Testando Model de Produtos', function () {
  describe('Requisito 01 - listar todos os produtos e produto por Id', function () {
    it('Está retornando todos os produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([products]);
      // Act
      const result = await productsModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(products);
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
  })
});