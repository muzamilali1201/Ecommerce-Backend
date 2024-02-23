const joi = require("joi");
const User = require("../models/User");

const validationScehma = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().default("user"),
});

module.exports = validationScehma;
