//@ts-nocheck
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Order from '../models/order';
import OrderProduct from '../models/order_product';
import Product from '../models/product';
import User from '../models/user';

dotenv.config();

export const getOrders = async (req: Request, res: Response) => {
    try {
        const order = await Order.findAll({
            include: {model: Product}
        });
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: {model: Product}
        });
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.create({
            user_id: req.body.user_id,
            status: req.body.status
        });
        res.json(order);
    } catch (err) {
        res.status(401);
        console.log(`Exception caught while creating user.  Err: ${err}`);
        res.json(err);
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.update(
            {
                user_id: req.body.user_id,
                status: req.body.status,
            },
            {
                returning: true,
                where: {id: req.params.id}
            }
        );
        res.json(order);
    } catch (err) {
        res.status(400);
        console.log(`Exception caught while updating user.  Err: ${err}`);
        res.json(err);
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.destroy({
            returning: true,
            where: {id: req.params.id}
        });
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}


export const addProduct = async (req: Request, res: Response) => {
    try {
        // Find the order by the ID passed in through the request
        const order = await Order.findByPk(req.params.id);

        // An order exists and is in open status, so create the record in join table
        if (order != null && order.status === 'open') {
            const orderProduct = await OrderProduct.create({
                order_id: req.params.id,
                product_id: req.body.productid,
                quantity: parseInt(req.body.quantity)
            });
            res.json(orderProduct);
        } else {
            // Order wasn't found, or the order is already complete/canceled
            res.status(400);
            res.json('Error adding product to order.  Order may not exist or is no longer in open status.')
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        // Get the user by userId first
        const user = await User.findByPk(parseInt(req.params.id));

        if (user != null) {
            // Get all of the orders associated with the user  
            const orders = await Order.findAll({
                where: {
                    user_id: user.id,
                    status: 'open'
                },
                include: {model: Product}
            });
            res.json(orders);
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}