const Order = require("../models/Order");
const Prodcut = require("../models/Product");
const Cart = require("../models/cart");
const customError = require("../utils/error");

const orderProduct = async (req, res) => {
  const id = req.id;
  const userCart = await Cart.findOne({ userId: id });
  const { street, country, state, postal, city } = req.body.shippingaddress;
  if (!street || !country || !state || !postal || !city) {
    throw new customError(404, "Each field is required!");
  } else {
    const order = await Order.create({
      userid: id,
      products: userCart.items,
      shippingaddress: {
        street,
        country,
        state,
        city,
        postal,
      },
    });
    if (order) {
      res.status(200).json({ message: "Product ordered successfully" });
      return;
    }
    throw new customError(500, "Something went wrong");
  }
};

const getOrder = async (req, res) => {
  const orderid = req.params.orderId;
  const searchedOrder = await Order.findOne({ _id: orderid });
  if (searchedOrder) {
    res.status(200).json({ SearchedOrder: searchedOrder });
    return;
  }
  throw new customError(500, "Something went wrong");
};
const listAllOrders = async (req, res) => {
  if (!req.query.sortBy) {
    const orders = await Order.find({ userid: req.id });
    if (orders) {
      res.status(200).json({ Orders: orders });
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
    const orders = await Order.find(filter).sort(sortOptions);
    if (orders) res.status(200).json({ Orders: orders });
    else {
      res.status(500).json({ message: "No query" });
    }
  }
};

const updateOrder = async (req, res) => {
  const orderid = req.params.orderId;
  const OrderToUpdate = await Order.findOne({ _id: orderid });
  if (OrderToUpdate) {
    OrderToUpdate.status = req.body.status;
    OrderToUpdate.save();
    res.status(200).json({ message: "Order updated successfully" });
    return;
  }
  res.status(500).json({ message: "Something went wrong!" });
};

module.exports = {
  orderProduct,
  getOrder,
  listAllOrders,
  updateOrder,
};
