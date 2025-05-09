const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const {fakerKO: faker} = require('@faker-js/faker');

const randomData = faker.number.int({min: 10, max: 100});

const banners = async (req, res) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v3/search/book?sort=accuracy&size=3&query=${randomData}`,
      {
        headers: {
          Authorization: `${process.env.RESTAPIKEY}`,
        },
      },
    );

    if (response.data.document == []) {
      res.status(404).message('⌛다시 로드해주세요');
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = {
  banners,
};

// https://dapi.kakao.com/v3/search/book?sort=accuracy&size=10&query=해리포터

// http://localhost:7777/books/apiBooks
