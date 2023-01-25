//@ts-nocheck
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user';

dotenv.config();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const hash = bcrypt.hashSync(req.body.password+process.env.BCRYPT_PASSWORD, 10);

        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash
        });

        var token = jwt.sign({user}, process.env.TOKEN_SECRET);
        res.json(token);
    } catch (err) {
        res.status(401);
        console.log(`Exception caught while creating user.  Err: ${err}`);
        res.json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        //console.log(`inside updateuser: ${req.params.id}, ${req.body.firstname}, ${req.body.lastname}`);
        const user = await User.update(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            },
            {
                returning: true,
                where: {id: req.params.id}
            }
        );
        res.json(user);
    } catch (err) {
        res.status(400);
        console.log(`Exception caught while updating user.  Err: ${err}`);
        res.json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.destroy({
            returning: true,
            where: {id: req.params.id}
        });
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: {id: req.body.id}
        });

        if (user) {
            const validPw = await bcrypt.compareSync(req.body.password+process.env.BCRYPT_PASSWORD, user.password);
            
            if (validPw) {
                var token = jwt.sign({user}, process.env.TOKEN_SECRET);
                res.status(200);
                res.json(token);
            } else {
                res.status(400);
                res.json('Invalid Password');
            }
        }
    } catch (err) {
        res.status(401);
        console.log(`Exception caught while loggin in.  Err: ${err}`);
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
