const expectedId = 3;

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const resultNewSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

const errorWithoutProductId = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "quantity": 5
  }
];

const errorWithoutQuantity = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
  }
];

const errorQuantityLength = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const productNotFound = [
  { productId:1, quantity:1},
  { productId:99999, quantity:5},
];

const productFindById = {
  "id": 1,
  "name": "Martelo de Thor"
};

module.exports = {
  expectedId,
  newSale,
  resultNewSale,
  errorWithoutProductId,
  errorWithoutQuantity,
  errorQuantityLength,
  productNotFound,
  productFindById,
}