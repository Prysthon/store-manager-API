const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findById = async (productId) => {
  const result = await productsModel.findById(productId);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: result };
};

const insertProduct = async (productName) => {
  const error = schema.validateName(productName);
  if (error.type) return { type: error.type, message: error.message };
  const result = await productsModel.insertProduct(productName);
  const message = {
    id: result,
    name: productName,
  };
  return { type: null, message };
};

const updateProduct = async (id, name) => {
  const error = schema.validateName(name);
  if (error.type) return { type: error.type, message: error.message };
  const validateProductExists = await findById(id);
  if (validateProductExists.type) {
    return { type: validateProductExists.type, message: validateProductExists.message };
  }
  const result = await productsModel.updateProduct(id, name);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
};
