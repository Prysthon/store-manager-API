const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');

const { generatedSaleId, newSale, sales } = require('./mocks/salesModel.mock');

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

  describe('Requisito 08 - Listar vendas', function () {
    it('Está listando todas as vendas ordenadas por saleId e productId', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([sales]);
      // Act
      const result = await salesModel.findAll();
      // Assert
      expect(result).to.be.deep.equal(sales);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});