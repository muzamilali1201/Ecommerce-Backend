const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customError = require("../utils/error");
const mailSender = require("../utils/nodemailer");

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
  mailSender(username, email);
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

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUser,
  updateProfile,
  updatePassword,
};
