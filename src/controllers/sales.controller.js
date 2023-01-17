const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSale = async (req, res) => {
  const { type, message } = await salesService.insertSale(req.body);
  if (type) return (res.status(errorMap.mapError(type)).json({ message }));
  return res.status(201).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

module.exports = {
  insertSale,
  findAll,
};