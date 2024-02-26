const joi = require("joi");
const User = require("../models/User");

const userValidationScehma = joi.object({
  username: joi.string().min(3),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().default("user"),
});

const productValidationSchema = joi.object({
  userid: joi.string(),
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  category: joi.string().required(),
});

const updateProductValidationSchema = joi.object({
  userid: joi.string(),
  name: joi.string(),
  price: joi.number(),
  description: joi.string(),
  category: joi.string(),
});

const CartValidationSchema = joi.object({
  userId: joi.string(),
  items: joi.array().items(
    joi.object({
      id: joi.string().required(),
      name: joi.string().required(),
      price: joi.number().required(),
      description: joi.string().required(),
      category: joi.string().required(),
      quantity: joi.number().default(1),
    })
  ),
});

const OrderValidationSchema = joi.object({
  userid: joi.string(),
  products: joi.array().items(
    joi.object({
      id: joi.string().required(),
      name: joi.string().required(),
      price: joi.number().required(),
      description: joi.string().required(),
      category: joi.string().required(),
      quantity: joi.number().default(1),
    })
  ),
  shippingaddress: joi.object({
    street: joi.string().required(),
    country: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    postal: joi.string().required(),
  }),
  status: joi.string().default("Pending"),
});

const ReviewValidationSchema = joi.object({
  userId: joi.string().required(),
  productId: joi.string().required(),
  review: joi.number().min(1).max(5).required(),
  comment: joi.string().required(),
});

module.exports = {
  userValidationScehma,
  productValidationSchema,
  CartValidationSchema,
  OrderValidationSchema,
  ReviewValidationSchema,
  updateProductValidationSchema,
};
