const connection = require('./connection');

const insertSale = async (newSale) => { 
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [new Date()],
  );
  const values = newSale
    .map(({ productId, quantity }) => `${insertId}, ${productId}, ${quantity}`).join(', ');
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quatity) VALUES (?, ?, ?)',
    [values],
  );
  return insertId;
};

module.exports = {
  insertSale,
};