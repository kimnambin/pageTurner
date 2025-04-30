const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`앱 실행중 http://localhost:${process.env.PORT}`);
});

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const cartRouter = require('./routes/cart');
const likeRouter = require('./routes/likes');
const orderRouter = require('./routes/orders');

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter);
app.use('/carts', cartRouter);
app.use('/likes', likeRouter);
app.use('/orders', orderRouter);
