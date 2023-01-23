//@ts-nocheck
import db from '../db-config';
import { DataTypes } from "sequelize";

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING
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

export default Order;