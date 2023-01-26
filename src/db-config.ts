//@ts-nocheck
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const {
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;


let db:Sequelize;

if (NODE_ENV === 'dev') {
    console.log(`Using DEV: ${process.env.POSTGRES_DB}`);
    db = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false
    });
}

if (NODE_ENV === 'test') {
    console.log(`Using TEST: ${process.env.POSTGRES_DB_TEST}`);
    db = new Sequelize(process.env.POSTGRES_DB_TEST, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        logging: false
    });
}

export default db;