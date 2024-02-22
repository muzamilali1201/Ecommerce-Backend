const Product = require("../models/Product");
const User = require("../models/User");
const customError = require("../utils/error");

const addNewProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const { id } = req;
  const product = await Product.create({
    userid: id,
    name,
    price,
    description,
    category,
  });
  if (product) {
    res.status(200).json({ message: "Product inserted successfully!" });
  } else {
    throw new customError(401, "You are not admin!");
  }
};

const listAllProducts = async (req, res) => {
  if (!req.query) {
    const products = await Product.find();
    if (products) {
      res.status(200).json({ Products: products });
    } else {
      res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    const filter = {};
    const sort = req.query.sortBy || "_id-desc";
    let [sortBy, order] = sort.split("-");
    order = order == "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = order;

    if (req.query.name) {
      filter.name = req.query.name;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const product = await Product.find(filter).sort(sortOptions);
    if (product) res.status(200).json({ SearchedProduct: product });
    else {
      res.status(500).json({ message: "No query" });
    }
  }
};

const DeleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

const UpdateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, description, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, description, category },
    { new: true }
  );
  if (product) {
    res.status(200).json({ message: "Product updated successfully!" });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  if (product) {
    res
      .status(200)
      .json({ message: "Successfully got the product", product: product });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

module.exports = {
  addNewProduct,
  listAllProducts,
  DeleteProduct,
  UpdateProduct,
  getProduct,
};
