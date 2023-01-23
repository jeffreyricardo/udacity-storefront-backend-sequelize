//@ts-nocheck
import express from "express";
import {getUsers, getUser, createUser, updateUser, loginUser, deleteUser, verifyAuthToken} from '../handlers/userHandler';
import {getProducts, getProduct, createProduct, updateProduct, getProductsByCategory} from '../handlers/productHandler';
import {getOrders, getOrder, createOrder, addProduct, getOrdersByUserId} from '../handlers/orderHandler';

const router =  express.Router();

router.get('/users', verifyAuthToken, getUsers);
router.post('/users/create', createUser);
router.get('/users/:id', verifyAuthToken, getUser);
router.put('/users/:id', verifyAuthToken, updateUser);
router.delete('/users/:id',verifyAuthToken, deleteUser);

router.get('/products', getProducts);
router.post('/products/create', verifyAuthToken, createProduct);
router.get('/products/:id', getProduct);
router.put('/products/:id', updateProduct);
router.get('/products/category/:id', getProductsByCategory);


router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders/create', createOrder);
router.post('/orders/:id/products', addProduct);

// Current order by user id
router.get('/orders/users/:id', getOrdersByUserId);

router.post('/login', loginUser);

export default router;