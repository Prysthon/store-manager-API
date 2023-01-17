const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('./../../../src/services');

const { salesController } = require('./../../../src/controllers');

const { newSale, correctResponse,
  saleWithoutProductId, correctResponseWithoutId,
  saleWithoutQuantity, correctResponseWithoutQuantity, findAllResults } = require('./mocks/salesController.mock');

describe('Testando Controller de Produtos', function () {
  describe('Requisito 06 - Cadastrar uma nova sale', function () {
    it('Cadastro de vendas corretamente', async function () {
      // Arrange
      const res = {};
      const req = {
        body: newSale,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSale').resolves(correctResponse);
      // Act

      await salesController.insertSale(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(correctResponse.message);
    });
  });

  describe('Requisito 06 - Verificando ao colocar dados errados', function () {
    it('Faltando campo product id deve retornar status 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: saleWithoutProductId,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSale').resolves(correctResponseWithoutId);
      // Act

      await salesController.insertSale(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: correctResponseWithoutId.message });
    });
    it('Faltando campo quantity deve retornar status 400', async function () {
      // Arrange
      const res = {};
      const req = {
        body: saleWithoutQuantity,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insertSale').resolves(correctResponseWithoutQuantity);
      // Act

      await salesController.insertSale(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: correctResponseWithoutQuantity.message });
    });
  });

  describe('Requisito 08 - Listando as vendas', function () {
    it('Lista todas as vendas', async function () {
      // Arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'findAll').resolves(findAllResults);
      // Act

      await salesController.findAll(req, res);
      // Assert

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: findAllResults.message });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});