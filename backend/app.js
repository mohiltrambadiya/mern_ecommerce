const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

//import router
const productRoute = require('./routes/productRoutes');
app.use('/api/v1', productRoute);

const userRoute = require('./routes/userRoutes');
app.use('/api/v1', userRoute);

//middleware for error
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;