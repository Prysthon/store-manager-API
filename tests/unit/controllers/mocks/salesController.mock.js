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

module.exports = {
  newSale,
  correctResponse,
  saleWithoutProductId, 
  correctResponseWithoutId,
  saleWithoutQuantity,
  correctResponseWithoutQuantity,
}