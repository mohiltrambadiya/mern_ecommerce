const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name.'],
            maxlength: [30, "Username can not exceed 30 characters."],
            minlength: [4, "Username should be grater than 4 characters."],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please enter your email.'],
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email."]
        },
        password: {
            type: String,
            required: [true, 'Please enter password.'],
            minlength: [8, "Password should be grater than 8 characters."],
            select: false
        },
        avatar: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        role: {
            type: String,
            default: 'user'
        },
        reset_password_token: String,
        reset_password_expire: Date
    },
    {
        timestamps: true
    }
);

//hash password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//generate JWT token
userSchema.methods.generateJWTtoken = function () {
    return JWT.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//compare password
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

//generate reset password token
userSchema.methods.getResetPasswordToken = function () {
    //genearte token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and adding reset token to userSchema
    this.reset_password_token = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.reset_password_expire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);