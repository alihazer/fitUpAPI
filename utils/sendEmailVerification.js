const uuid = require('uuid');
const nodemailer = require('nodemailer');
const EmailVerification = require('../Models/emailVerification.js');


const sendEmailVerification = async ({ _id, email }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.fastmail.com",
            port: "465",
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        // Generate a unique string for the token
        const uniqueString = uuid.v4() + _id;



        // Save the verification token to the database
        const verificationToken = new EmailVerification({
            user: _id,
            token: uniqueString
        });
        await verificationToken.save();

        // Construct the verification link
        const link = `${process.env.CLIENT_URL}/api/auth/verify-email/${uniqueString}`;

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verify your email address',
            html: `<p>Click <a href="${link}">here</a> to verify your email</p> <br>
                   <p>This link will expire in <b>6 hours</b></p>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports = { sendEmailVerification };
