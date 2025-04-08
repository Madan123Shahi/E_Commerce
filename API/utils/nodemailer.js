const nodemailer = require("nodemailer");

// Create a Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_PASS,
  },
});

// Send Email
const sendEmail = async (to, subject, text, html) => {
  from: `Madan Kumar Shahi:${process.env.NODE_MAIL}`, to, subject, text, html;
};

module.exports = sendEmail;
