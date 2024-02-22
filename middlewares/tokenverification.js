const jwt = require("jsonwebtoken");
const User = require("../models/User");

const tokenVerification = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "User is not login or the Auth Header is not set" });
    return;
  }
  token = token.split(" ")[1];
  const response = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ _id: response.id });
  if (user) {
    req.id = response.id;
    next();
  } else {
    res.status(403).message({ message: "User is not authorized" });
    return;
  }
};
module.exports = tokenVerification;
