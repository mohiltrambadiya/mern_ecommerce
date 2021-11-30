const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendJWTtoken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//user register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    },
  });
  sendJWTtoken(user, 201, res);
});

//user login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  sendJWTtoken(user, 200, res);
});

//user logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out succesfully",
  });
});

//send user reset password mail
exports.sendResetPasswordMail = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Hello ${user.name} \n\n Your reset password url is below. \n ${resetPasswordUrl} \n\n Thank you`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset passwod mail",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Reset password mail send to user succesfully.",
    });
  } catch (err) {
    user.reset_password_token = undefined;
    user.reset_password_expire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //create hash of reset token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken);
  const user = await User.findOne({
    reset_password_token: resetPasswordToken,
    reset_password_expire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expire.", 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and confirmPassword must be same.", 404)
    );
  }

  user.password = req.body.password;
  user.reset_password_token = undefined;
  user.reset_password_expire = undefined;
  await user.save();

  sendJWTtoken(user, 200, res);
});

//get user detail
exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

//change user password
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  if (req.body.oldPassword === req.body.newPassword) {
    return next(
      new ErrorHandler("Oldpassword and newPassword can not be same.", 400)
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("newPassword and confiemPassword not matched.", 400)
    );
  }

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Oldpassword not matched.", 404));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendJWTtoken(user, 200, res);
});

//update user profile.
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    validateBeforeSave: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//get all user - admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//get user by id - admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//delete user - admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted succesfully.",
  });
});
