const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('./../../../src/services');

const { productsController } = require('./../../../src/controllers');

const { resultsFindAll, resultsFindById, errorFindById, resultsNewProductInsert, errorWithoutName, errorMinLengthName } = require('./mocks/productsController.mock');

describe('Testando Controller de Produtos', function () {
  describe('Requisito 01 - listar todos os produtos e produto por Id', function () {
    it('Está retornando todos os produtos', async function () {
      // Arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findAll').resolves(resultsFindAll);
      // Act

      await productsController.findAll(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultsFindAll.message);
    });

    it('Está retornando produto dado o id', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves(resultsFindById);
      // Act

      await productsController.findById(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultsFindById.message);
    });
    it('Está retornando erro ao inserir id inválido', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById').resolves(errorFindById);
      // Act

      await productsController.findById(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: errorFindById.message });
    });
  });

  describe('Requisito 03 -  Cadastrar um novo produto', function () {
    it('Está retornando o status 201 com o cadastro do produto', async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: 'produtoX',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertProduct').resolves(resultsNewProductInsert);
      // Act

      await productsController.insertProduct(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resultsNewProductInsert.message);
    });
  });

  describe('Requisito 04 - verificando possíveis erros ao cadastrar um novo produto', function () {
    it('Está retornando o status 400 com a resposta da função', async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: '',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertProduct').resolves(errorWithoutName);
      // Act

      await productsController.insertProduct(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Está retornando o status 422 com a resposta da função', async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: 'ABCD',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertProduct').resolves(errorMinLengthName);
      // Act

      await productsController.insertProduct(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Requisito 08 - Atualizando um produto', function () {
    it('está recebendo um objeto e retornando status 200 com objeto nome e id', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: {
          name: 'Martelo do Batman',
        },
      };
      const response = {
        type: null,
        message: {
          "id": 1,
          "name": "Martelo do Batman"
        }};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves(response);
      // Act
      await productsController.updateProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(response.message);
    });
    it('está recebendo um objeto e retornando status 200 com objeto nome e id', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: {
        },
      };
      const response = {
        type: 'INVALID_REQUEST',
        message: '"name" is required'
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves(response);
      // Act
      await productsController.updateProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
  });

  describe('Requisito 12 - deletando um produto', function () {
    it('está recebendo um objeto e retornando status 204', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      const result = {
        type: null, 
        message: '',
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct').resolves(result);
      // Act
      await productsController.deleteProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
    it('está recebendo um objeto e retornando status 204', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 999 },
      };
      const result = {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct').resolves(result);
      // Act
      await productsController.deleteProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });


  afterEach(function () {
    sinon.restore();
  });
});