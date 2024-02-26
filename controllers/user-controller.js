const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customError = require("../utils/error");
const mailSender = require("../utils/nodemailer");
const Verification = require("../models/verification");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new customError(409, "User already exists!");
  }
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = await Verification.create({
    userid: user._id,
    code: crypto.randomBytes(32).toString("hex"),
  });
  const link = `http://localhost:3000/api/v1/${user._id}`;
  let message = {
    action: "verify",
    text: link,
  };
  mailSender(email, message, username);
  if (user) {
    res.status(201).json({ message: "User successfully registered" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const Check = await User.findOne({ email: email });
  const passwordCheck = await bcrypt.compare(password, Check.password);
  if (Check.email == email && passwordCheck) {
    const token = jwt.sign({ id: Check._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token)
      .json({ message: "Successfull Login" });
  } else {
    throw new customError(403, "Password or email is incorrect");
  }
};
const getCurrentUser = async (req, res) => {
  const id = req.id;
  const currentUser = await User.findOne({ _id: id }).select("-password");

  if (currentUser) {
    res.status(200).json({ currentUser: currentUser });
    return;
  }
  throw new customError(403, "User has not login yet");
};

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json({ Users: users });
    return;
  }
};

const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const id = req.id;
  const updateUser = await User.findByIdAndUpdate(
    id,
    { username, email },
    { new: true }
  );
  if (updateUser) {
    res.status(200).json({ message: "Profile Updates Successfully!" });
    return;
  }
  throw new customError(403, "Something went wrong!");
};
const updatePassword = async (req, res) => {
  const id = req.id;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const passwordUpdate = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  );
  if (passwordUpdate) {
    res.status(200).json({ message: "Password updated successfully" });
    return;
  }
};

const sendPassLink = async (req, res) => {
  // const userid = req.id;
  const email = req.body.email;
  const checkemail = await User.findOne({ email: email });
  if (checkemail) {
    await Verification.create({
      userid: checkemail._id,
      code: crypto.randomBytes(32).toString("hex"),
    });
    const link = `http://localhost:3000/password-reset/${checkemail._id}`;
    await mailSender(email, link);
    res
      .status(200)
      .json({ message: "Password reset link has sent successfully" });
    return;
  }
  throw new customError(500, "User with this email doesn't exist");
};

const resetPassword = async (req, res) => {
  const userid = req.params.userid;
  const token = req.params.token;
  // console.log(userid, token);
  const userCheck = await User.findOne({ _id: userid });
  const password = await bcrypt.hash(req.body.password, 10);
  const tokenCheck = await Verification.findOne({
    userid: userid,
    code: token,
  });
  console.log(tokenCheck);
  if (tokenCheck) {
    userCheck.password = password;
    await userCheck.save();
    await Verification.findByIdAndDelete(userid);
    res.status(200).json({ message: "Password reset successfully" });
    return;
  }
  throw new customError(404, "Token not found or expired");
};

const verifyUser = async (req, res) => {
  const userid = req.params.userid;
  const token = req.params.token;
  const tokenCheck = await Verification.findOne({
    userid: userid,
    code: token,
  });
  console.log(tokenCheck);
  if (tokenCheck) {
    await User.findByIdAndUpdate(userid, { verified: true }, { new: true });
    res.status(200).json({ message: "User verified successfully!" });
    return;
  }
  throw new customError(500, "Something went wrong");
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUser,
  updateProfile,
  updatePassword,
  sendPassLink,
  resetPassword,
  verifyUser,
};
