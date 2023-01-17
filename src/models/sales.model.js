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

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sale_id, date, product_id, quantity 
    FROM 
      StoreManager.sales_products as Sp
    INNER JOIN StoreManager.sales as S
    ON Sp.sale_id = S.id
    ORDER BY sale_id ASC, product_id ASC;`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT 
      sale_id, date, product_id, quantity 
    FROM 
      StoreManager.sales_products as Sp
    INNER JOIN StoreManager.sales as S
    ON Sp.sale_id = S.id
    WHERE sale_id = ?;`,
    [saleId],
  );
  return result;
};

module.exports = {
  insertSale,
  findAll,
  findById,
};