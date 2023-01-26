import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);
describe('Test for API Routes', () => {

    describe('User Related Routes', () => {

        it('Create route for Users - first user', async () => {
            const resp = await req.post('/users/create')
                                    .send({firstname: 'TestFirstName', lastname: 'TestLastName', password: 'password123'});
            expect(resp.status).toBe(200);
        });

        it('Create route for Users - second user', async () => {
            const resp = await req.post('/users/create')
                                    .send({firstname: 'TestFirstName2', lastname: 'TestLastName2', password: 'password123'});
            expect(resp.status).toBe(200);
        });

        it('Index route for Users', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Now get the users
            const resp = await req.get('/users').set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
        });

        it('Get specific user by id ', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Now get the user
            const resp = await req.get('/users/2').set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
        });

        it('Update route for Users', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Now do the update
            const resp = await req.put('/users/2')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({firstname: 'UpdFirstName', lastname: 'UpdLastName'});
            expect(resp.status).toBe(200);
        });

        it('Delete route for Users', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Now delete
            const resp = await req.delete('/users/2')
                                    .set('Authorization',`Bearer ${token}`)
            expect(resp.status).toBe(200);
        });

    });

    describe('Product Related Routes', () => {

        it('Create route for Products - first product', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Create the product now that we have token
            const resp = await req.post('/products/create')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({name: 'Test Product', price: 500, category: 'Test'});
            expect(resp.status).toBe(200);
        });

        it('Create route for Products - second product', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Create the product now that we have token
            const resp = await req.post('/products/create')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({name: 'Test Product2', price: 25, category: 'Test'});
            expect(resp.status).toBe(200);
        });


        it('Index route for Products', async () => {
            const resp = await req.get('/products');
            expect(resp.status).toBe(200);
        });

        it('Show route for Products', async () => {
            const resp = await req.get('/products/1');
            expect(resp.status).toBe(200);
        });

        it('Update route for Products', async () => {
            const resp = await req.put('/products/1').send({name: 'Updated Product', price: 100});
            expect(resp.status).toBe(200);
        });

        it('Index route for ProductsByCategory', async () => {
            const resp = await req.get('/products').send({category: 'Test'});
            expect(resp.status).toBe(200);
        });
        
        // Lets not delete this product yet
        /*
        it('Delete route for Products', async () => {
            const resp = await req.delete('/products/2');
            expect(resp.status).toBe(200);
        });
        */

    });

    describe('Order Related Routes', () => {

        it('Create route for Orders - First order', async () => {
            const resp = await req.post('/orders/create').send({user_id: 1, status: 'open'});
            expect(resp.status).toBe(200);
        });

        it('Create route for Orders - Second order', async () => {
            const resp = await req.post('/orders/create').send({user_id: 1, status: 'open'});
            expect(resp.status).toBe(200);
        });
        
        it('Index route for Orders', async () => {
            const resp = await req.get('/orders');
            expect(resp.status).toBe(200);
        });

        it('Show route for Orders', async () => {
            const resp = await req.get('/orders/1');
            expect(resp.status).toBe(200);
        });

        it('Add Product route for Orders', async () => {
            const resp = await req.post('/orders/1/products').send({order_id: 1, productid: 1, quantity: 5});
            expect(resp.status).toBe(200);
        });

        it('Update route for Orders - Marking order as complete', async () => {
            const resp = await req.put('/orders/1').send({user_id: 1, status: 'complete'});
            expect(resp.status).toBe(200);
        });

        it('Add Product route for Orders - Order is complete, so cannot add product', async () => {
            const resp = await req.post('/orders/1/products').send({order_id: 1, productid: 2, quantity: 10});
            expect(resp.status).toBe(400);
        });

        it('Get current (open) order by UserId', async () => {
            // Login first to get the token
            const loginResp = await req.post('/login').send({
                id: '1',
                password: 'password123'
            });
            const token = loginResp.body;

            // Get the orders now that we have token
            const resp = await req.get('/orders/users/1').set('Authorization',`Bearer ${token}`);
            expect(resp.status).toBe(200);
        });

    });



//     router.get('/products/category/:id', getProductsByCategory);

});