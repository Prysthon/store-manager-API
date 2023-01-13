const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('./../../../src/services');

const { productsController } = require('./../../../src/controllers');

const { resultsFindAll, resultsFindById, errorFindById } = require('./mocks/productsController.mock');

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
      expect(res.json).to.have.been.calledWith(errorFindById.message);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});