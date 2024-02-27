# E-commerce Backend API Documentation

Welcome to the API documentation for the E-commerce Backend project. This documentation outlines the endpoints and functionalities provided by the backend server for managing various aspects of an e-commerce platform.

## Authentication Endpoints

### Register User
- **POST** `/register`
  - Registers a new user with the provided details.
  - Requires valid user data.
  
### Login User
- **POST** `/login`
  - Authenticates a user and generates a JWT token for subsequent requests.
  - Requires valid user credentials.

### Get Current User
- **GET** `/current`
  - Retrieves information about the currently authenticated user.
  - Requires a valid JWT token.

### Update User Profile
- **PUT** `/update`
  - Updates the profile information of the current user.
  - Requires valid user data and a JWT token.

### Update User Password
- **PUT** `/password`
  - Allows the current user to update their password.
  - Requires a valid JWT token.

### Get All Users
- **GET** `/alluser`
  - Retrieves information about all users (restricted to specific user roles).
  - Requires a valid JWT token with appropriate permissions.

### Send Password Reset Link
- **POST** `/password-reset`
  - Sends a password reset link to the user's email address.

### Reset Password
- **POST** `/password-reset/:userid/:token`
  - Allows the user to reset their password using a reset token.

### Verify User
- **POST** `/verify/:userid/:token`
  - Verifies the user's email address using a verification token.

## Product Management Endpoints

### Add New Product
- **POST** `/`
  - Adds a new product to the database.
  - Requires valid product data and authentication with appropriate permissions.

### List All Products
- **GET** `/`
  - Retrieves a list of all products available in the database.

### Delete Product
- **DELETE** `/:id`
  - Deletes a product from the database by ID.
  - Requires authentication and appropriate permissions.

### Update Product
- **PUT** `/:id`
  - Updates the details of a product specified by ID.
  - Requires valid product data, authentication, and appropriate permissions.

### Get Product
- **GET** `/:id`
  - Retrieves details of a product specified by ID.

## Cart Management Endpoints

### Add to Cart
- **POST** `/add/:productId`
  - Adds a product to the user's cart.
  - Requires authentication and valid product data.

### Remove from Cart
- **POST** `/remove/:productId`
  - Removes a product from the user's cart.
  - Requires authentication.

### Update Cart
- **POST** `/update/:productId`
  - Updates the quantity of a product in the user's cart.
  - Requires authentication.

### View Cart
- **GET** `/all`
  - Retrieves the contents of the user's cart.
  - Requires authentication.

## Order Management Endpoints

### Place Order
- **POST** `/`
  - Places a new order for the user.
  - Requires authentication and valid order data.

### Get Order
- **GET** `/:orderId`
  - Retrieves details of a specific order by ID.
  - Requires authentication.

### List All Orders
- **GET** `/`
  - Retrieves a list of all orders placed by the user.
  - Requires authentication.

### Update Order
- **PUT** `/:orderId`
  - Updates the status of an order specified by ID.
  - Requires authentication and appropriate permissions.

## Review Management Endpoints

### Add Review
- **POST** `/:productId`
  - Adds a review for a product.
  - Requires authentication and valid review data.

### Get Review
- **GET** `/:productId`
  - Retrieves reviews for a specific product.
  - Requires authentication.

## File Management Endpoints

### Upload File
- **POST** `/`
  - Uploads a file to the server.
  - Requires authentication, appropriate permissions, and valid file upload.

### Get File
- **GET** `/:filename`
  - Retrieves a file from the server by filename.
  - Requires authentication.

### Remove File
- **DELETE** `/:filename`
  - Deletes a file from the server by filename.
  - Requires authentication and appropriate permissions.

### List All Files
- **GET** `/`
  - Retrieves a list of all files stored on the server.
  - Requires authentication.

## Payment Management Endpoints

### Checkout
- **POST** `/checkout`
  - Initiates the checkout process for the user's cart.
  - Requires authentication and valid cart data.

### Payment Success
- **GET** `/success/:userid`
  - Handles the success callback after a successful payment.
  - Requires authentication.

