const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const ensureAuthrizaion = require('../auth');
const jwt = require('jsonwebtoken');

//도서 전체 조회 (category별 조회 + category별 신간 조회)
const all_books = (req, res) => {
  let allBooksRes = {};
  let {category_id, new_book, limit, currentPage} = req.query;

  let offset = limit * (currentPage - 1);

  let sql = `SELECT SQL_CALC_FOUND_ROWS *, 
    (SELECT COUNT(*) FROM likes WHERE liked_books_id = books.id) AS likes 
    FROM books `;

  let values = [];

  if (category_id && new_book) {
    sql += ` WHERE category_id=? AND pubDate 
    BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() `;
    values.push(Number(category_id));
  } else if (category_id) {
    sql += ` WHERE category_id=? `;
    values.push(Number(category_id));
  } else if (new_book) {
    sql += ` WHERE pubDate 
    BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() `;
  }

  sql += ` LIMIT ? OFFSET ?`;

  values.push(Number(limit), offset);

  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (!result.length) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    result.map(item => {
      item.pubDate = item.pubDate;
      delete item.pubDate;
    });

    allBooksRes.books = result;

    let countSql = `SELECT FOUND_ROWS() AS totalCount`;

    conn.query(countSql, (err, countResult) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      let pagination = {
        currentPage: Number(currentPage),
        totalCount: countResult[0].totalCount,
      };

      allBooksRes.pagination = pagination;

      return res.status(StatusCodes.OK).json(allBooksRes);
    });
  });
};

// book detail
const book_detail = (req, res) => {
  let authorization = ensureAuthrizaion(req, res);

  let loginSQL = `SELECT *,
      (SELECT COUNT(*) FROM likes WHERE liked_books_id = books.id) AS 'likes' ,
        (SELECT EXISTS
          (SELECT * FROM likes WHERE user_id = ? AND liked_books_id = ?)) AS 'liked'
        FROM books
        LEFT JOIN category ON books.category_id = category.category_id
        WHERE books.id = ?;`;

  let noLoginSQL = `SELECT *,
      (SELECT COUNT(*) FROM likes WHERE liked_books_id = books.id) AS 'likes'
        FROM books 
        LEFT JOIN category ON books.category_id = category.category_id
        WHERE books.id = ?;`;

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세센이 완료. 다시 로그인 필요',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '토큰 이상 감지',
    });
  }
  // 로그인을 하지 않는 상태
  else if (authorization instanceof ReferenceError) {
    let book_id = req.params.id;

    let values = [book_id];

    conn.query(
      noLoginSQL,
      values,

      (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (result[0]) {
          return res.status(StatusCodes.OK).json(result);
        } else {
          return res.status(StatusCodes.NOT_FOUND).end();
        }
      },
    );
  } else {
    let book_id = req.params.id;

    let values = [authorization.id, book_id, book_id];

    conn.query(
      loginSQL,
      values,

      (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (result[0]) {
          return res.status(StatusCodes.OK).json(result);
        } else {
          return res.status(StatusCodes.NOT_FOUND).end();
        }
      },
    );
  }
};

module.exports = {
  all_books,
  book_detail,
};
