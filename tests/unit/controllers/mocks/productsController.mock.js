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

const errorWithoutName = {
  type: 'INVALID_REQUEST',
  message: '"name" is required',
}

const errorMinLengthName = {
  type: 'INVALID_NAME',
  message: '"name" length must be at least 5 characters long',
}

module.exports = {
  resultsFindAll,
  resultsFindById,
  errorFindById,
  resultsNewProductInsert,
  errorWithoutName,
  errorMinLengthName,
}