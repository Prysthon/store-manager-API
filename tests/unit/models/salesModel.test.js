const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');

const { generatedSaleId, newSale } = require('./mocks/salesModel.mock');

describe('Testando Model de Sales', function () {
  describe('Requisito 06 - Cadastrar uma nova venda', function () {
    it('Está retornando todos os produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([generatedSaleId]);
      // Act
      const result = await salesModel.insertSale(newSale);
      // Assert
      expect(result).to.be.equal(generatedSaleId.insertId);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});