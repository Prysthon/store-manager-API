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

const sales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

module.exports = {
  expectedId,
  newSale,
  resultNewSale,
  errorWithoutProductId,
  errorWithoutQuantity,
  errorQuantityLength,
  productNotFound,
  productFindById,
  sales,
}