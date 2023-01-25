CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(64) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);