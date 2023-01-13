const { productsModel } = require('../models');

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
  const result = await productsModel.insertProduct(productName);
  const message = {
    id: result,
    name: productName,
  };
  return { type: null, message };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};
