//@ts-nocheck
import db from '../db-config';
import { DataTypes } from "sequelize";

const OrderProduct = db.define('order_products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
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

export default OrderProduct;