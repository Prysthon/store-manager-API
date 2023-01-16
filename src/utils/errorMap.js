const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_REQUEST: 400,
  INVALID_NAME: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};