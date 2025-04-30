const express = require('express');
const router = express.Router();
const {
  addCart,
  getCart,
  removeCartItem,
} = require('../controller/cart-controller');

router.use(express.json());

// add cart
router.post('/', addCart);

// select cart + (주문 예상 목록)
router.get('/', getCart);

// del cart
router.delete('/:id', removeCartItem);

module.exports = router;
