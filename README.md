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
- PUT /products/:id
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

---

**NOTE:**

dotenv has been used with the override setting to false.  Environment variables that have already been set on your machine will NOT be overridden with values from your .env file. 

`start` and `watch` scripts found in package.json are explicitly set to use the dev environment `NODE_ENV=dev`.

`test` script found in package.json is explicitly set to use the test environment `NODE_ENV=test`.

---

```
NODE_ENV=test
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
3. db-migrate --env dev up
4. npm run start
```

Unit tests can be executed using the following steps:
```
npm run test
```
