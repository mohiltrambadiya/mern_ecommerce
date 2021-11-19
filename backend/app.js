const express = require('express');

const app = express();
app.use(express.json());

//import router
const productRoute = require('./routes/productRoutes');

app.use('/api/v1', productRoute);

//middleware for error
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;