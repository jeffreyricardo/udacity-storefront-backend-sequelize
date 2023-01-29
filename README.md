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
- Index `/users` [GET]
  - Retrieves a list of all users
- Show `/users/:id` [GET]
  - Retrieves user by ID
- Create `/users/create` [POST]
  - Create a new user
    - firstname
    - lastname
    - password
- Update `/users/:id` [PUT]
  - Update user by ID
    - firstname (optional)
    - lastname (optional)
    - password (optional)
- Delete `/users/:id` [DELETE]
  - Delete user by ID

### Products
- Index `/products` [GET]
  - Retrieves a list of all products
- Show `/products/:id` [GET]
  - Retrieves product by ID
- Create `/products/create` [POST]
  - Create a new product
    - name
    - price
    - category
- Update `/products/:id` [PUT]
  - Update product by ID
    - name (optional)
    - price (optional)
    - category (optional)
- Delete `/products/:id` [DELETE]
  - Delete product by ID

### Orders
- Index `/orders` [GET]
  - Retrieves a list of all orders
- Show `/orders/:id` [GET]
  - Retrieves order by ID
- Create `/orders/create` [POST]
  - Create a new order
    - user_id
    - status
- Create `/orders/:id/products` [POST]
  - Add a product to an order
    - productid
    - quantity
- Index `/orders/users/:id` [GET]
  - Retrieves OPEN orders by user ID

### Login
- Auth `/login` [POST]
  - Returns JWT token
    - id
    - password

---

## Data Shapes / Schema
An ERD can be found [here](https://github.com/jeffreyricardo/udacity-storefront-backend-sequelize/blob/main/storefront_ERD.png).

#### Products
- id `SERIAL PRIMARY KEY`
- name `VARCHAR(150) NOT NULL`
- price `DECIMAL(12,2)`
- category `VARCHAR(64)`
- createdAt `TIMESTAMP`
- updatedAt `TIMESTAMP`

#### Users
- id `SERIAL PRIMARY KEY` 
- password `VARCHAR(255) NOT NULL`
- firstName `VARCHAR(150) NOT NULL`
- lastName `VARCHAR(150) NOT NULL`
- createdAt `TIMESTAMP`
- updatedAt `TIMESTAMP`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `BIGINT NOT NULL REFERENCES users(id)`
- status `VARCHAR(64) NOT NULL`
- createdAt `TIMESTAMP`
- updatedAt `TIMESTAMP`

#### Order_Products
- id `SERIAL PRIMARY KEY`
- quantity `INTEGER NOT NULL`
- order_id `BIGINT NOT NULL REFERENCES orders(id)`
- product_id `BIGINT NOT NULL REFERENCES products(id)`
- createdAt `TIMESTAMP`
- updatedAt `TIMESTAMP`



---

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

