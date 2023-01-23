//@ts-nocheck
import db from '../db-config';
import { DataTypes } from "sequelize";

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
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

export default User;