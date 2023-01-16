const { productsModel } = require('../../models');
const { validateExistName, validateNameLength,
  validateNewSalesSchema, validateQuantityMin } = require('./schema');

const validateName = (productName) => {
  const { error: withoutName } = validateExistName.validate(productName);
  if (withoutName) return { type: 'INVALID_REQUEST', message: '"name" is required' };
  const { error: notMinLength } = validateNameLength.validate(productName);
  if (notMinLength) {
 return {
    type: 'INVALID_NAME',
    message: '"name" length must be at least 5 characters long',
  };
  }
  return { type: null, message: '' };
};

const validateNewSale = (newSale) => {
  const { error: missingKeys } = validateNewSalesSchema.validate(newSale);
  if (missingKeys) return { type: 'MISSING_FIELDS', message: `"${missingKeys.message.slice(5)}` };
  const { error: minQuantity } = validateQuantityMin.validate(newSale);
  if (minQuantity) return { type: 'NOT_ENOUGH', message: `"${minQuantity.message.slice(5)}` };
  return { type: null, message: '' };
};

const CheckingIdValid = async (newSale) => {
  const idList = newSale.map(({ productId }) => productId);
  const error = idList.map(async (id) => productsModel.findById(id));
  const resolvePromises = await Promise.all(error);
  const verificationId = resolvePromises.every((p) => p);
  if (!verificationId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateName,
  validateNewSale,
  CheckingIdValid,
};