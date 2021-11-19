//generate jwt token and save it to cookie

const sendJWTtoken = (user, statusCode, res) => {
    const token = user.generateJWTtoken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
} 

module.exports = sendJWTtoken;