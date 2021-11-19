const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendJWTtoken = require('../utils/jwtToken');

//user register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample",
            url: "sample"
        }
    });
    sendJWTtoken(user, 201, res);
});

//user login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password.", 400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    sendJWTtoken(user, 200, res);
})

//user logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged out succesfully"
    });
});

//get all user-admin
exports.getAllUser = async (req, res) => {
    res.json('200');
}