const nodeMailer = require('nodemailer');
const catchAsyncError = require('../middleware/catchAsyncError');

const sendEmail = async (options) => {
    const transpoter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;