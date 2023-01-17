const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);
  if (type) return (res.status(errorMap.mapError(type)).json({ message }));
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { message } = await productsService.updateProduct(id, name);
  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
};
