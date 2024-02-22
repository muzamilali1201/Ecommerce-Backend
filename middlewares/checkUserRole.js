const User = require("../models/User");
const checkUserRole = async (req, res, next) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (user.role == "admin") {
    next();
    return;
  } else {
    res.status(403).json({
      message: "You are not admin",
    });
  }
};

module.exports = checkUserRole;
