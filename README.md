# E-commerce Backend API Documentation

This documentation provides details about the routes available in the E-commerce backend API. These routes facilitate various functionalities such as user management, product management, order processing, cart management, review management, and file management.

## User Routes

### Register User

- **Route:** POST /api/user/register
- **Description:** Registers a new user with the system.
- **Middleware:** None
- **Parameters:**
  - username: String (required)
  - email: String (required)
  - password: String (required)
- **Returns:** JSON object with user details and access token.

### Login User

- **Route:** POST /api/user/login
- **Description:** Logs in an existing user.
- **Middleware:** None
- **Parameters:**
  - email: String (required)
  - password: String (required)
- **Returns:** JSON object with user details and access token.

### Get Current User

- **Route:** GET /api/user/current
- **Description:** Retrieves details of the current logged-in user.
- **Middleware:** Token verification
- **Parameters:** None
- **Returns:** JSON object with user details.

### Update User Profile

- **Route:** PUT /api/user/update
- **Description:** Updates the profile information of the current user.
- **Middleware:** Token verification
- **Parameters:** User details to be updated (username, email, etc.)
- **Returns:** JSON object with updated user details.

### Update User Password

- **Route:** PUT /api/user/password
- **Description:** Updates the password of the current user.
- **Middleware:** Token verification
- **Parameters:** Old and new password
- **Returns:** Success message if password is updated successfully.

### Get All Users

- **Route:** GET /api/user/alluser
- **Description:** Retrieves details of all users (restricted to admin users).
- **Middleware:** Token verification, Check user role
- **Parameters:** None
- **Returns:** JSON array of user objects.

## Product Routes

### Add New Product

- **Route:** POST /api/product
- **Description:** Adds a new product to the system.
- **Middleware:** Token verification, Check user role
- **Parameters:** Product details (name, description, price, etc.)
- **Returns:** JSON object with product details.

### List All Products

- **Route:** GET /api/product
- **Description:** Retrieves details of all products.
- **Middleware:** None
- **Parameters:** None
- **Returns:** JSON array of product objects.

### Delete Product

- **Route:** DELETE /api/product/:id
- **Description:** Deletes a product by ID.
- **Middleware:** Token verification, Check user role
- **Parameters:** Product ID
- **Returns:** Success message if product is deleted successfully.

### Update Product

- **Route:** PUT /api/product/:id
- **Description:** Updates a product by ID.
- **Middleware:** Token verification, Check user role
- **Parameters:** Product ID and updated details
- **Returns:** JSON object with updated product details.

### Get Product

- **Route:** GET /api/product/:id
- **Description:** Retrieves details of a product by ID.
- **Middleware:** None
- **Parameters:** Product ID
- **Returns:** JSON object with product details.

## Order Routes

### Order Product

- **Route:** POST /api/order
- **Description:** Places an order for a product.
- **Middleware:** Token verification
- **Parameters:** Product ID and order details
- **Returns:** JSON object with order details.

### Get Order

- **Route:** GET /api/order/:orderId
- **Description:** Retrieves details of an order by order ID.
- **Middleware:** Token verification
- **Parameters:** Order ID
- **Returns:** JSON object with order details.

### List All Orders

- **Route:** GET /api/order
- **Description:** Retrieves details of all orders.
- **Middleware:** Token verification
- **Parameters:** None
- **Returns:** JSON array of order objects.

### Update Order

- **Route:** PUT /api/order/:orderId
- **Description:** Updates an order by order ID (restricted to admin users).
- **Middleware:** Token verification, Check user role
- **Parameters:** Order ID and updated details
- **Returns:** JSON object with updated order details.

## Cart Routes

### Add to Cart

- **Route:** POST /api/cart/add/:productId
- **Description:** Adds a product to the user's cart.
- **Middleware:** Token verification
- **Parameters:** Product ID
- **Returns:** JSON object with updated cart details.

### Remove from Cart

- **Route:** POST /api/cart/remove/:productId
- **Description:** Removes a product from the user's cart.
- **Middleware:** Token verification
- **Parameters:** Product ID
- **Returns:** JSON object with updated cart details.

### Update Cart

- **Route:** POST /api/cart/update/:productId
- **Description:** Updates the quantity of a product in the user's cart.
- **Middleware:** Token verification
- **Parameters:** Product ID and updated quantity
- **Returns:** JSON object with updated cart details.

### View Cart

- **Route:** GET /api/cart/all
- **Description:** Retrieves details of the user's cart.
- **Middleware:** Token verification
- **Parameters:** None
- **Returns:** JSON object with cart details.

## Review Routes

### Add Review

- **Route:** POST /api/review/:productId
- **Description:** Adds a review for a product.
- **Middleware:** Token verification
- **Parameters:** Product ID and review details
- **Returns:** JSON object with review details.

### Get Review

- **Route:** GET /api/review/:productId
- **Description:** Retrieves reviews for a product.
- **Middleware:** Token verification
- **Parameters:** Product ID
- **Returns:** JSON array of review objects.

## File Routes

### Upload File

- **Route:** POST /api/upload
- **Description:** Uploads a file to the server.
- **Middleware:** Token verification, Check user role
- **Parameters:** File to be uploaded
- **Returns:** JSON object with file details.

### Get File

- **Route:** GET /api/upload/:filename
- **Description:** Retrieves a file by filename.
- **Middleware:** Token verification
- **Parameters:** Filename
- **Returns:** File download/stream.

### Remove File

- **Route:** DELETE /api/upload/:filename
- **Description:** Deletes a file by filename.
- **Middleware:** Token verification, Check user role
- **Parameters:** Filename
- **Returns:** Success message if file is deleted successfully.

### List All Files

- **Route:** GET /api/upload
- **Description:** Retrieves details of all uploaded files.
- **Middleware:** Token verification, Check user role
- **Parameters:** None
- **Returns:** JSON array of file objects.
