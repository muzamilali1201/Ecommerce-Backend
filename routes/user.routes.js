const express = require("express");

// Importing controller functions
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUser,
  updateProfile,
  updatePassword,
} = require("../controllers/user-controller");

// Middlewares
const tokenVerification = require("../middlewares/tokenverification");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const checkUserRole = require("../middlewares/checkUserRole");
const { userValidationSchema } = require("../utils/validationSchema");
const router = express.Router();

// Route for user registration
router.post(
  "/register",
  [joiSchemaValidation(userValidationSchema)],
  registerUser
);

// Route for user login
router.post("/login", loginUser);

// Route for getting current user information
router.get("/current", [tokenVerification], getCurrentUser);

// Route for updating user profile
router.put(
  "/update",
  [tokenVerification, joiSchemaValidation(userValidationSchema)],
  updateProfile
);

// Route for updating user password
router.put("/password", [tokenVerification], updatePassword);

// Route for getting all users (restricted to specific user roles)
router.get("/alluser", [tokenVerification, checkUserRole], getAllUser);

module.exports = router;
