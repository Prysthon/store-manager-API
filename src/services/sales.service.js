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
  return { type: null, message: result };
};

module.exports = {
  insertSale,
  findAll,
};