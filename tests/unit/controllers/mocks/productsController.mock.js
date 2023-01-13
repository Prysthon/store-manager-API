const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  }
];

const product = {
  id: 1,
  name: "Martelo de Thor"
};

const resultsFindAll = {
  type: null,
  message: products
};

const resultsFindById = {
  type: null,
  message: product,
};

const errorFindById = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found'
}

module.exports = {
  resultsFindAll,
  resultsFindById,
  errorFindById,
}