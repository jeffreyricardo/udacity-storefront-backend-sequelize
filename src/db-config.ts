import { Sequelize } from "sequelize";

const db = new Sequelize('storefront', 'storefront_user', 'password123', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
});

export default db;