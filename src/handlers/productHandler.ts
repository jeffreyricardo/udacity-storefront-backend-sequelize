//@ts-nocheck
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Product from '../models/product';

dotenv.config();

export const getProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.findAll();
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: parseInt(req.body.price),
            category: req.body.category
        });
        res.json(product);
    } catch (err) {
        res.status(401);
        console.log(`Exception caught while creating product.  Err: ${err}`);
        res.json(err);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.update(
            {
                name: req.body.name,
                price: parseInt(req.body.price)
            },
            {
                returning: true,
                where: {id: req.params.id}
            }
        );
        res.json(product);
    } catch (err) {
        res.status(400);
        console.log(`Exception caught while updating user.  Err: ${err}`);
        res.json(err);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.destroy({
            returning: true,
            where: {id: req.params.id}
        });
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const product = await Product.findAll({
            where: {category: req.params.id}
        });
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(401)
    }
}
