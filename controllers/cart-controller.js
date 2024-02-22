const Product = require("../models/Product");
const Cart = require("../models/cart");
const mongoose = require("mongoose");
const customError = require("../utils/error");

const addToCart = async (req, res) => {
  const productid = req.params.productId;
  const userid = req.id;
  let { quantity } = req.body;
  let product = await Product.findOne({ _id: productid });
  product = product.toObject();
  product.quantity = quantity;
  const cart = await Cart.findOne({ userId: userid });
  if (!cart) {
    const cartCreation = await Cart.create({
      userId: userid,
      items: [product],
    });
    res.status(200).json({ message: "Cart created Successfully" });
    return;
  }

  const addProduct = await Cart.findOne({ userId: userid });
  let itemArr = addProduct.items;
  for (let i = 0; i < itemArr.length; i++) {
    if (itemArr[i]._id == productid) {
      throw new customError(409, "Product already exist");
    }
  }
  addProduct.items.push(product);
  await addProduct.save();
  res.status(200).json({ message: "Product added to cart successfully" });
};

const removeFromCart = async (req, res) => {
  const userId = req.id;
  const productid = req.params.productId;
  const product = await Product.findOne({ _id: productid });
  const isCart = await Cart.findOne({ userId: userId });
  if (isCart) {
    let itemArr = isCart.items;
    if (itemArr.length > 0) {
      itemArr.forEach((elements) => {
        if (elements._id == productid) {
          itemArr.splice(productid, 1);
        }
      });
      await isCart.save();
      res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
      return;
    }
    throw new customError(404, "There's nothing in cart!");
  }
  throw new customError(404, "Cart doesn't exist!");
};

const updateCart = async (req, res) => {
  const userId = req.id;
  const productid = req.params.productId;
  const product = await Product.findOne({ _id: productid });
  const isCart = await Cart.findOne({ userId: userId });
  if (isCart) {
    const { quantity } = req.body;
    if (isCart.items.length < 1) {
      throw new customError(404, "Nothing to update!");
    }
    isCart.items.forEach((element) => {
      if (element._id == productid) {
        element.quantity = quantity;
      }
    });
    await isCart.save();
    res.status(200).json({ message: "Cart updated successfully!" });
  }
};

const viewCart = async (req, res) => {
  const userid = req.id;
  const cartItems = await Cart.findOne({ userId: userid });
  if (!cartItems) {
    throw new customError(
      404,
      "No cart is available for this user,kindly create one."
    );
  }
  res.status(200).json({ CartItems: cartItems.items });
};
module.exports = { addToCart, removeFromCart, updateCart, viewCart };
