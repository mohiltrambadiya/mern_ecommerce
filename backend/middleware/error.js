const ErrorHandler = require('../utils/errorhandler');

//manage error
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //manage case error || wrond mongodb id error
    if(err.name === 'CastError') {
        const message = `Resource not found. invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}