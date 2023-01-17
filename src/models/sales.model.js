const connection = require('./connection');

const insertSale = async (newSale) => { 
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [new Date()],
  );

  const values = [newSale.map((product) =>
    [insertId, product.productId, product.quantity])];
  await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
    values,
  );

  return insertId;
};

module.exports = {
  insertSale,
};