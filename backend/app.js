const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//config
dotenv.config({ path: "backend/config/config.env" });

//import router
const productRoute = require("./routes/productRoutes");
app.use("/api/v1", productRoute);

const userRoute = require("./routes/userRoutes");
app.use("/api/v1", userRoute);

const orderRoute = require("./routes/orderRoutes");
app.use("/api/v1", orderRoute);

const paymentRoute = require("./routes/paymentRoutes");
app.use("/api/v1", paymentRoute);

//middleware for error
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
