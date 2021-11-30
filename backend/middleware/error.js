const ErrorHandler = require('../utils/errorhandler');

//manage error
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //manage cast error || wrond mongodb id error
    if(err.name === 'CastError') {
        const message = `Resource not found. invalid: ${err.stack}`;
        err = new ErrorHandler(message, 400);
    }

    //manage duplicate key error
    if(err.code === 11000) {
        err = new ErrorHandler(`This ${Object.keys(err.keyValue)} is already exist.`, 400);
    }

    //wrong JWT token error
    if(err.name === 'JsonWebTokenError') {
        err = new ErrorHandler(`Invalid token, please try again.`, 400);
    }

    //JWT expire error
    if(err.name === 'TokenExpireError') {
        err = new ErrorHandler(`Token expired, please try again.`, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}