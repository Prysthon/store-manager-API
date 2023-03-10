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

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).json(message);
};

module.exports = {
  insertSale,
  findAll,
  findById,
  deleteSale,
};