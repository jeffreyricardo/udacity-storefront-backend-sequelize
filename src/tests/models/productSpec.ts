import supertest from 'supertest';
import app from '../../server';
import db from '../../db-config';
import Product from '../../models/product';

const req = supertest(app);

try {
    db.authenticate();
} catch (err) {
    console.log(`Error connecting to database.  Error: ${err}`);
}

describe('Product Model', () => {

    beforeAll(() => {
        Product.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    afterAll(() => {
        Product.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    it('Create Product', async () => {
        const product = await Product.create({
            name: 'Pepperoni Pizza',
            price: 12,
            category: 'italian'
        });
        expect(product).toBeInstanceOf(Product);
    });

    it('Get Product', async () => {
        const product = await Product.findAll();
        expect(product).toBeDefined();
    });

    it('Get Product By ID', async () => {
        const product = await Product.findByPk(1);
        expect(product).toBeInstanceOf(Product);
    });

    it('Update Product', async () => {
        const product = await Product.update({
            name: 'Cheese Pizza',
            price: 10,
        },
        {
            returning: true,
            where: {id: 1}

        });
        expect(product).toBeDefined();
    });

    it('Delete Product', async () => {
        const product = await Product.destroy({
            where: {id: 1}
        });
        expect(product).toBeDefined();
    });

});