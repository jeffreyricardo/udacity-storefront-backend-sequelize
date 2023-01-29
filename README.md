# Storefront Backend Project

This repo contains an API built with Node and Express to simulate the backend for an online storefront.  

## Technology Stack
This application utilizes the following technology stack:
- Postgres Database (via Docker)
- Node/Express for the application logic
- Dotenv for managing environment variables
- Sequelize for database Object Relational Mapping
- db-migrate for migrations
- jsonwebtoken for working with JWTs
- jasmine for testing

## Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

Full requirements can be viewed via the [REQUIREMENTS.md](REQUIREMENTS.md) file.  

## Routes
API routes are listed below.

Included is a synopsis of the endpoint, as well as the required parameters for the request.  

A [Postman Collection](udacity-storefront-backend.postman_collection.json) is also included for aid in manual testing.

### Users
- GET /users
  - Retrieves a list of all users
- GET /users/:id
  - Retrieves user by ID
- POST /users/create
  - Create a new user
    - firstname
    - lastname
    - password
- PUT /users/:id
  - Update user by ID
    - firstname (optional)
    - lastname (optional)
    - password (optional)
- DELETE /users/:id
  - Delete user by ID

### Products
- GET /products
  - Retrieves a list of all products
- GET /products/:id
  - Retrieves product by ID
- POST /products/create
  - Create a new product
    - name
    - price
    - category
- PUT /products/:id
  - Update product by ID
    - name (optional)
    - price (optional)
    - category (optional)
- DELETE /products/:id
  - Delete product by ID

### Orders
- GET /orders
  - Retrieves a list of all orders
- GET /orders/:id
  - Retrieves order by ID
- POST /orders/create
  - Create a new order
    - user_id
    - status
- POST /orders/:id/products
  - Add a product to an order
    - productid
    - quantity
- GET /orders/users/:id
  - Retrieves OPEN orders by user ID

### Login
- POST /login
  - Returns JWT token
    - id
    - password

## Build Steps
As this application is docker based, a `.env` file is required.  Please ensure that the variables are populated to match your local environment.

---

```
NODE_ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=######
POSTGRES_PASSWORD=#######
SALT_ROUNDS=10
BCRYPT_PASSWORD=#######
TOKEN_SECRET=#######
```

Application can be run using the following steps:
```
1. docker-compose up
2. npm install
3. npm install -g db-migrate (if not already installed)
4. db-migrate --env dev up
5. npm run start
```

Unit tests can be executed using the following steps:
```
npm run test
```
**NOTE:**

Should the user want to run unit tests in a test environment, `.env` must be updated so that `NODE_ENV=test`.  `package.json` must also be updated to match environment name.

---
## Tips
> 💡 To ensure appropriate usage of the API, it is helpful to prioritize/order creation of data.
```
1. Create User
2. Create (multiple) Products
3. Create Order
4. Add Product to Order
5. Update Order (status = closed)
6. Attempt to add product to closed order
```

