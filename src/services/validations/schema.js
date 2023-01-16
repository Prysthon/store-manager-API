const Joi = require('joi');

const validateExistName = Joi.string().required();

const validateNameLength = Joi.string().min(5);

const validateNewSalesSchema = Joi.array().items({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const validateQuantityMin = Joi.array().items({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  validateExistName,
  validateNameLength,
  validateNewSalesSchema,
  validateQuantityMin,
};