const Joi = require('joi');

const validateExistName = Joi.string().required();

const validateNameLength = Joi.string().min(5);

module.exports = {
  validateExistName,
  validateNameLength,
};