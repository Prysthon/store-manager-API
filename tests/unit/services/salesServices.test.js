const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');

const { salesService } = require('./../../../src/services');

const { expectedId, newSale, resultNewSale, errorWithoutProductId, errorWithoutQuantity, errorQuantityLength, productNotFound, productFindById, sales, resultSalesById, resultSalesModel } = require('./mocks/salesServices.mock');

describe('Testando Service de Sales', function () {
  describe('Requisito 06 - Cadastrar as sales corretamente', function () {
    it('Está retornando objeto corretamente', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
        .resolves(productFindById)
        .onSecondCall()
        .resolves(productFindById);

      sinon.stub(salesModel, 'insertSale').resolves(expectedId);
      // Act
      const result = await salesService.insertSale(newSale);

      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(resultNewSale);
    });
  });

  describe('Requisito 06 - Cadastrar as sales incorretamente e conferir erro', function () {
    it('Cadastrando venda sem o ProductId', async function () {
      // Arrange

      // Act
      const result = await salesService.insertSale(errorWithoutProductId);

      // Assert
      expect(result.type).to.be.equal('MISSING_FIELDS');
      expect(result.message).to.be.equal('"productId" is required' );
    });
    it('Cadastrando venda sem o quantity', async function () {
      // Arrange

      // Act
      const result = await salesService.insertSale(errorWithoutQuantity);

      // Assert
      expect(result.type).to.be.equal('MISSING_FIELDS');
      expect(result.message).to.be.equal('"quantity" is required');
    });
    it('Cadastrando venda sem o quantity', async function () {
      // Arrange

      // Act
      const result = await salesService.insertSale(errorQuantityLength);

      // Assert
      expect(result.type).to.be.equal('NOT_ENOUGH');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });
    it('Cadastrando venda de um produto que não tem id', async function () {
      // Arrange
      // primeira vez - productFindById
      // segunda vez - undefined
      sinon.stub(productsModel, 'findById')
        .onFirstCall()
          .resolves(productFindById)
        .onSecondCall()
          .resolves(undefined);

      // Act
      const result = await salesService.insertSale(productNotFound);

      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  describe('Requisito 08 - Listar vendas', function () {
    it('Está listando todas as vendas corretamente', async function () {
      // Arrange
      sinon.stub(salesModel, 'findAll').resolves(resultSalesModel);
      // Act
      const result = await salesService.findAll();

      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(sales);
    });
    it('Está retornando produto dado o id', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(resultSalesModel);
      const expectedId = 1;
      // Act
      const result = await salesService.findById(expectedId);
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(resultSalesById);
    });
    it('Está retornando erro ao inserir id inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const expectedId = 999;
      // Act
      const result = await salesService.findById(expectedId);
      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });
  });

  describe('Requisito 14 - Deletar vendas', function () {
    it('Está recebendo um id e respondendo com type null e message ""', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves(resultSalesModel);
      sinon.stub(salesModel, 'deleteSale').resolves(1);
      // Act
      const result = await salesService.deleteSale();

      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal('');
    });
    it('ao receber um id inexistente retorna um erro', async function () {
      // Arrange
      sinon.stub(salesModel, 'findById').resolves([]);
      // Act
      const result = await salesService.deleteSale(999);
      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});