//@ts-nocheck
import db from '../db-config';
import { DataTypes } from "sequelize";

const Product = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "createdat"
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updatedat"
    }
}, {
    timestamps: true
});

export default Product;