const express = require('express');
const router = express.Router();
const {all_books, book_detail} = require('../controller/book-controller');

router.use(express.json());

router.get('/book_list', all_books); //도서 전체 조회
router.get('/book_detail/:id', book_detail); // category book detail

module.exports = router;
