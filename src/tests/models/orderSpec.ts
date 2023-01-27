import supertest from 'supertest';
import app from '../../server';
import db from '../../db-config';
import Order from '../../models/order';
import User from '../../models/user';

const req = supertest(app);

try {
    db.authenticate();
} catch (err) {
    console.log(`Error connecting to database.  Error: ${err}`);
}

describe('Order Model', () => {

    beforeAll(() => {
        Order.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    afterAll(() => {
        Order.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    it('Create Order', async () => {
        const user = await User.create({
            firstname: 'Cliff',
            lastname: 'Bishop',
            password: 'password123'
        });

        const order = await Order.create({
            user_id: 1,
            status: 'open'
        });
        expect(order).toBeInstanceOf(Order);
    });

    it('Get Order', async () => {
        const order = await Order.findAll();
        expect(order).toBeDefined();
    });

    it('Get Order By ID', async () => {
        const order = await Order.findByPk(1);
        expect(order).toBeInstanceOf(Order);
    });

    it('Update Order', async () => {
        const order = await Order.update({
            status: 'completed',
        },
        {
            returning: true,
            where: {id: 1}

        });
        expect(order).toBeDefined();
    });

    it('Delete Order', async () => {
        const order = await Order.destroy({
            where: {id: 1}
        });
        expect(order).toBeDefined();
    });

});