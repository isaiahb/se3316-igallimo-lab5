require('dotenv').config();
const nodeMailer = require('nodemailer');


function sendEmail(message, emailAddress, subject) {
	let transporter = nodeMailer.createTransport({
        host : 'smtp.gmail.com',
        port : '465',
        secure : true,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: emailAddress,
        subject: subject,
        text : message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = sendEmail;