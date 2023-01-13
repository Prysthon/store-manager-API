const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productsController.findAll,
);

module.exports = router;