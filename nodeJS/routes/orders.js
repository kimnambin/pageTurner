const express = require('express');
const router = express.Router();
const {
  order,
  get_order,
  get_order_detail,
} = require('../controller/order-controller');

router.use(express.json());

// write orders
router.post('/', order);

// select orders
router.get('/', get_order);

// select detail orders
router.get('/:id', get_order_detail);

module.exports = router;
