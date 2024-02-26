const customError = require("../utils/error");
const joi = require("joi");

const joiSchemaValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
      return;
    }
    throw new customError(403, error.message);
  };
};
module.exports = joiSchemaValidation;
