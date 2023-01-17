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

const correctResponse = {
  type: null,
  message: { id: 3, itemsSold: newSale }
}

const saleWithoutProductId = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "quantity": 5
  }
];

const correctResponseWithoutId = {
  type: 'MISSING_FIELDS',
  message: '"productId" is required'
}

const saleWithoutQuantity = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
  }
];

const correctResponseWithoutQuantity = {
  type: 'MISSING_FIELDS',
  message: '"quantity" is required'
}

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

const findAllResults = {
  type: null,
  message: sales
}

module.exports = {
  newSale,
  correctResponse,
  saleWithoutProductId, 
  correctResponseWithoutId,
  saleWithoutQuantity,
  correctResponseWithoutQuantity,
  findAllResults,
}