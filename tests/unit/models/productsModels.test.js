const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { products, productWithId } = require('./mocks/productsModels.mock');

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
    it('Está retornando produto dado o id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[productWithId]]);
      const expectedId = 1;
      // Act
      const result = await productsModel.findById(expectedId);
      // Assert
      expect(result).to.be.deep.equal(productWithId);
    });
    it('Está retornando erro ao inserir id inexistente', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[]]);
      const expectedId = 999;
      // Act
      const result = await productsModel.findById(expectedId);
      // Assert
      expect(result).to.be.equal(undefined);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});