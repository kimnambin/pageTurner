const express = require('express');
const router = express.Router();
const {addLike, removeLike} = require('../controller/like-controller');

router.use(express.json());

router.post('/book_likes/:id', addLike); // add likes
router.delete('/book_likes/:id', removeLike); // del likes

module.exports = router;
