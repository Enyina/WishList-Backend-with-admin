const nodemailer = require("nodemailer");
// create a transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  // Define the mail options
  const mailOptions = {
    from: "Matthew Enyina <hello@matthew.oi>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };
  // Send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
