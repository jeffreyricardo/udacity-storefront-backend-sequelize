# Storefront Backend Project

This repo contains an API built with Node and Express to simulate the backend for an online storefront.  

## Technology Stack
This application utilizes the following technology stack:
- Postgres Database (via Docker)
- Node/Express for the application logic
- Dotenv from npm for managing environment variables
- Sequelize for database Object Relational Mapping
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

Full requirements can be viewed via the [REQUIREMENTS.md](REQUIREMENTS.md) file.  

## Routes
### Users
- GET /users
- GET /users/:id
- POST /users/create
- PUT /users/:id
- DELETE /users/:id

### Products
- GET /products
- GET /products/:id
- POST /products/create
- PUT /prouducts/:id
- DELETE /products/:id

### Orders
- GET /orders
- GET /orders/:id
- POST /orders/create
- POST /orders/:id/products
- GET /orders/users/:id

### Login
- POST /login


## Build Steps
As this application is docker based, a `.env` file is required.  Please ensure that the variables are populated to match your local environment.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=password123
SALT_ROUNDS=10
BCRYPT_PASSWORD=uplink-slowest-trio
TOKEN_SECRET=eard-hairy-gonads
```

Application can be run using the following steps:
```
1. docker-compose up
2. npm install
3. db-migrate up
4. npm run build
5. npm run test
```
