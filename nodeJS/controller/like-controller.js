const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthrizaion = require('../auth');

// 좋아요 추가
const addLike = (req, res) => {
  const book_id = req.params.id;

  let authorization = ensureAuthrizaion(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세센이 완료. 다시 로그인 필요',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 이상 감지',
    });
  } else {
    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);`;
    let values = [authorization.id, book_id];
    conn.query(
      sql,
      values,

      (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(result);
      },
    );
  }
};

// 좋아요 삭제
const removeLike = (req, res) => {
  const book_id = req.params.id;

  let authorization = ensureAuthrizaion(req, res);

  if (ensureAuthrizaion instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세센이 완료. 다시 로그인 필요',
    });
  } else if (ensureAuthrizaion instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 이상 감지',
    });
  } else {
    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ? ;`;
    let values = [authorization.id, book_id];
    conn.query(
      sql,
      values,

      (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(result);
      },
    );
  }
};

module.exports = {addLike, removeLike};
