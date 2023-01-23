CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(12,2),
    category VARCHAR(64),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);