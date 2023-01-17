const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const { productsService } = require('./../../../src/services');

const schema = require('./../../../src/services/validations/validationsInputValues');

const { products, productFindById, productName } = require('./mocks/productsServices.mock');

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

  describe('Requisito 03 - Cadastrar um novo produto', function () {
    it('Está enviando um objeto com id e produto no message', async function () {
      // Arrange
      const expectedId = 4;
      sinon.stub(productsModel, 'insertProduct').resolves(expectedId);
      // Act
      const result = await productsService.insertProduct(productName);
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal({ id: expectedId, name: productName });
    });
  });

  describe('Requisito 04 - verificando possíveis erros ao cadastrar um novo produto', function () {
    it('Está enviando um produto sem o nome', async function () {
      // Arrange - não é necessário

      // Act
      const result = await productsService.insertProduct('');
      // Assert
      expect(result.type).to.be.equal('INVALID_REQUEST');
      expect(result.message).to.be.equal('"name" is required');
    });
    it('Está enviando um produto com um nome menor do que 5 caracteres', async function () {
      // Arrange - não é necessário

      // Act
      const result = await productsService.insertProduct('ABCD');
      // Assert
      expect(result.type).to.be.equal('INVALID_NAME');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Requisito 10 - atualizar um produto', function () {
    it('Está recebendo um objeto com id e novo nome', async function () {
      // Arrange
      const expected = {
        "id": 1,
        "name": "Martelo do Batman"
      };
      sinon.stub(schema, 'validateName').resolves(expected);
      sinon.stub(productsModel, 'findById').resolves(expected);
      sinon.stub(productsModel, 'updateProduct').resolves({type: null, message: expected});
      // Act
      const result = await productsService.updateProduct(1, 'Martelo do Batman');
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message.message).to.be.deep.equal(expected);
    });
    it('Está retornando um erro ao procurar por um produto inexistente', async function () {
      // Arrange
      const expected = {
        type: 'PRODUCT_NOT_FOUND',
        message: "Product not found"
      };
      sinon.stub(productsModel, 'findById').resolves(undefined);
      sinon.stub(productsModel, 'updateProduct').resolves(expected);
      // Act
      const result = await productsService.updateProduct(999, 'Martelo do Batman');
      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal("Product not found");
    });
    it('Está retornando um erro ao não inserir o nome', async function () {
      // Arrange
      const expected = {
        type: 'INVALID_REQUEST',
        message: '"name" is required'
      };
      sinon.stub(schema, 'validateName').resolves(expected);
      // Act
      const result = await productsService.updateProduct(999);
      // Assert
      expect(result.type).to.be.equal('INVALID_REQUEST');
      expect(result.message).to.be.deep.equal('"name" is required');
    });
  });

  describe('Requisito 12 - deletando um produto', function () {
    it('Está recebendo número de linhas afetadas e responde com um type null e message null', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves([1, 2, 3]);
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      // Act
      const result = await productsService.deleteProduct(1);
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal('');
    });
    it('Está recebendo um id inexistente e respondendo com um erro', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // const response = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      // Act
      const result = await productsService.deleteProduct(999);
      // Assert
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});