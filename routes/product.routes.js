const express = require("express");

// Importing controller functions
const {
  addNewProduct,
  listAllProducts,
  DeleteProduct,
  UpdateProduct,
  getProduct,
} = require("../controllers/product-controller");

// Middlewares
const tokenVerification = require("../middlewares/tokenverification");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const checkUserRole = require("../middlewares/checkUserRole");

const { productValidationSchema } = require("../utils/validationSchema");

// Creating a router instance
const router = express.Router();

// Route for adding a new product
router.post(
  "/",
  [
    tokenVerification,
    checkUserRole,
    joiSchemaValidation(productValidationSchema),
  ],
  addNewProduct
);

// Route for listing all products
router.get("/", listAllProducts);

// Route for deleting a product by ID
router.delete("/:id", [tokenVerification, checkUserRole], DeleteProduct);

// Route for updating a product by ID
router.put(
  "/:id",
  [
    joiSchemaValidation(productValidationSchema),
    tokenVerification,
    checkUserRole,
  ],
  UpdateProduct
);

// Route for getting a product by ID
router.get("/:id", getProduct);

module.exports = router;
