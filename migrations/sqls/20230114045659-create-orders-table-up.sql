CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status NOT NULL VARCHAR(64),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);