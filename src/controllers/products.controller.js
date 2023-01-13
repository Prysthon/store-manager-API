const { productsService } = require('../services');
// const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

module.exports = {
  findAll,
};
