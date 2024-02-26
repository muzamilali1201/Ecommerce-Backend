const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const mailSender = async (to, message, username = "Mr.") => {
  const info = await transporter.sendMail({
    from: process.env.user,
    to: to,
    subject: "Successfully signup",
    text:
      message.action == "verify"
        ? ` Dear ${username},
        
      Thank you for registering on Ecommerce Backend! We're excited to have you join our community.
      
      To complete your registration and start exploring our platform, please verify your email address by clicking the link below:
      
      ${message.text}
      
      Thank you,`
        : message.text,
  });
};

module.exports = mailSender;
