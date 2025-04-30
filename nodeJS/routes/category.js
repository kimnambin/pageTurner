const express = require('express');
const router = express.Router();
const {all_category} = require('../controller/category-controller');

router.use(express.json());

router.get('/', all_category); //카테고리 전체 조회

module.exports = router;
