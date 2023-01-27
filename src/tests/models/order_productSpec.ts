import supertest from 'supertest';
import app from '../../server';
import db from '../../db-config';
import Order from '../../models/order';
import Product from '../../models/product';
import OrderProduct from '../../models/order_product';
import User from '../../models/user';

const req = supertest(app);

try {
    db.authenticate();
} catch (err) {
    console.log(`Error connecting to database.  Error: ${err}`);
}

describe('OrderProduct Model', () => {

    beforeAll(() => {
        OrderProduct.destroy({ truncate: true, cascade: false, restartIdentity: true });
    });

    afterAll(() => {
        OrderProduct.destroy({ truncate: true, cascade: false, restartIdentity: true });
    });

    it('Create OrderProduct', async () => {
        // Create user first
        const user = await User.create({
            firstname: 'Cliff',
            lastname: 'Bishop',
            password: 'password123'
        });

        // Create product
        const product = await Product.create({
            name: 'Pepperoni Pizza',
            price: 12,
            category: 'italian'
        });

        // Create order
        const order = await Order.create({
            user_id: 1,
            status: 'open'
        });

        // Create order_product
        const orderProduct = await OrderProduct.create({
            order_id: 1,
            product_id: 1,
            quantity: 5
        });

        expect(orderProduct).toBeInstanceOf(OrderProduct);
    });

    it('Get OrderProduct', async () => {
        const orderProduct = await OrderProduct.findAll();
        expect(orderProduct).toBeDefined();
    });

    it('Get OrderProduct By ID', async () => {
        const orderProduct = await OrderProduct.findByPk(1);
        expect(orderProduct).toBeDefined();
    });

    it('Update OrderProduct', async () => {
        const orderProduct = await OrderProduct.update({
            quantity: 3
        },
        {
            where: {id: 1}
        });
        expect(orderProduct).toBeDefined();
    });

    it('Delete OrderProduct', async () => {
        const orderProduct = await OrderProduct.destroy({
            where: {id: 1}
        });
        expect(orderProduct).toBeDefined();
    });

});