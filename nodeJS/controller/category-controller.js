const conn = require('../db');
const {StatusCodes} = require('http-status-codes');

// category
const all_category = (req, res) => {
  let sql = `SELECT * FROM category`;
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  });
};

module.exports = {all_category};
