const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  salesController.insertSale,
);

router.get(
  '/',
  salesController.findAll,
);

router.get(
  '/:id',
  salesController.findById,
);

module.exports = router;