const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const mailSender = async (username, to) => {
  const info = await transporter.sendMail({
    from: process.env.user,
    to: to,
    subject: "Successfully signup",
    text: `Dear ${username},

        Welcome to E-commerce backend! We're thrilled to have you join our community.
        
        Thank you for choosing to be a part of our platform. With your new account, you'll have access to a wide range of products and exclusive offers.
        
        If you have any questions or need assistance, feel free to reach out to our support team at support@example.com.
        
        Happy shopping!
        
        Best regards,
        Muzamal Ali`,
  });
};

module.exports = mailSender;
