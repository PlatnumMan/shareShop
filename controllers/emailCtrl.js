const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hey 👻" <foo@example.com>', // sender address
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
});

module.exports = sendEmail;
