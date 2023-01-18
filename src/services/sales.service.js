const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const insertSale = async (newSale) => {
  const error = schema.validateNewSale(newSale);
  if (error.type) return { type: error.type, message: error.message };
  const idIsValid = await schema.CheckingIdValid(newSale);
  if (idIsValid.type) return { type: idIsValid.type, message: idIsValid.message };
  const result = await salesModel.insertSale(newSale);
  return { type: null, message: { id: result, itemsSold: newSale } };
};

const findAll = async () => {
  const result = await salesModel.findAll();
  const filterResult = result
    .map(({ sale_id: saleId, date, product_id: pr, quantity }) =>
      ({ saleId, date, productId: pr, quantity }));
  return { type: null, message: filterResult };
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  const filterResult = result
    .map(({ date, product_id: pr, quantity }) => ({ date, productId: pr, quantity }));
  return { type: null, message: filterResult };
};

const deleteSale = async (saleId) => {
  const error = await findById(saleId);
  if (error.type) return { type: error.type, message: error.message };
  await salesModel.deleteSale(saleId);
  return { type: null, message: '' };
};

module.exports = {
  insertSale,
  findAll,
  findById,
  deleteSale,
};