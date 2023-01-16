const { validateExistName, validateNameLength } = require('./schema');

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

module.exports = {
  validateName,
};