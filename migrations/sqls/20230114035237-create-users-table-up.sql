CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);