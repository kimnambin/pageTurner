const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ensureAuthorization = (req, res) => {
  try {
    let receivedJWT = req.headers['authorization'];

    if (!receivedJWT) {
      return receivedJWT;
    }

    let decodedJWT = jwt.verify(receivedJWT, `${process.env.PRIVATE_KEY}`);

    return decodedJWT;
  } catch (e) {
    console.log(`오류 이름은 : ${e.name}, 
      오류 내용은 : ${e.message}`);
  }
};

module.exports = ensureAuthorization;
