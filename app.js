const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userLogger = require('./middlewares/logger')

app.use(bodyParser.json());
app.use(express.json())

app.use(userLogger)

app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', orderRouter)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});