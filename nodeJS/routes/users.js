const express = require('express');
const router = express.Router();
const conn = require('../db');
const {statusCodes} = require('http-status-codes');
const {
  joinup,
  login,
  pw_reset_req,
  pw_reset,
} = require('../controller/user-controller');

router.use(express.json());

router.post('/joinup', joinup); //회원가입
router.post('/login', login); //로그인
router.post('/reset', pw_reset_req); //비밀번호 초기화 요청
router.put('/reset', pw_reset); //비밀번호 초기화

module.exports = router;
