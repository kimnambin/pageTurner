const express = require('express');
const router = express.Router();
const {banners} = require('../controller/random-controller');

router.use(express.json());

router.get('/banners', banners);

module.exports = router;
