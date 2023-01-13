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

const newProduct = {
  id: 4,
  name: 'produtoX'
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
};

const resultsNewProductInsert = {
  type: null,
  message: newProduct,
};

module.exports = {
  resultsFindAll,
  resultsFindById,
  errorFindById,
  resultsNewProductInsert,
}