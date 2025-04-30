const conn = require('../db');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // 암호화를 담당해주는 Node의 기본 모듈
const dotenv = require('dotenv');
dotenv.config();

// 회원가입 콜백함수=================================
const joinup = (req, res) => {
  const {email, password} = req.body;

  let sql = `INSERT INTO users (email, password , salt)
         values(?,?,?)`;

  //비밀번호 암호화
  // 회원가입 => 암호화된 비밀번호 + salt 값 같이 DB저장
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPW = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');

  conn.query(
    sql,
    [email, hashPW, salt],

    (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (result.affectedRows)
        return res.status(StatusCodes.CREATED).json(result);
      else return res.status(StatusCodes.BAD_REQUEST);
    },
  );
};

//로그인 로직=========================
const login = (req, res) => {
  const {email, password} = req.body;

  let sql = `SELECT * FROM users WHERE email = ? `;

  conn.query(
    sql,
    [email],

    (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      let loginUser = result[0];

      // password와 salt 비교 후 로그인
      const hashPW = crypto
        .pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512')
        .toString('base64');

      if (loginUser && loginUser.password == hashPW) {
        // jwt
        const token = jwt.sign(
          {
            id: loginUser.id,
            email: loginUser.email,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: '150m',
            issuer: 'Nam',
          },
        );
        //cookie
        res.cookie('token', token, {
          httpOnly: true,
        });

        console.log(token);

        return res.status(StatusCodes.OK).json({...result[0], token});
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
    },
  );
};

// 비밀번호 초기화 요청==============================
const pw_reset_req = (req, res) => {
  const {email, password} = req.body;

  let sql = `SELECT * FROM users WHERE email = ? `;

  conn.query(
    sql,
    [email, password],

    (err, result) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      const user = result[0];
      if (user) {
        return res.status(StatusCodes.OK).json({
          email,
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
    },
  );
};

// 비밀번호 초기화 ====================================
const pw_reset = (req, res) => {
  let {email, password} = req.body;

  let sql = `UPDATE users SET password = ? , salt=?
  WHERE email = ?`;

  const salt = crypto.randomBytes(10).toString('base64');
  const hashPW = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');

  if (password) {
    conn.query(
      sql,
      [hashPW, salt, email],

      (err, result) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (result.affectedRows == 0) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(result);
      },
    );
  }
};

module.exports = {joinup, login, pw_reset_req, pw_reset};
