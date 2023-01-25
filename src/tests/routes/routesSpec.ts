import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);
describe('Test for API Routes', () => {

    describe('User Related Routes', () => {

        let token = '';
        beforeAll(async ():Promise<void> => {
            const resp = await req.post('/login').send({
                id: '4',
                password: 'password123'
            });
            token = resp.body;
        });

        it('Index route for Users', async () => {
            const resp = await req.get('/users').set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
        });

        it('Get specific user by id ', async () => {
            const resp = await req.get('/users/4').set('Authorization', `Bearer ${token}`);
            expect(resp.status).toBe(200);
        });

        it('Create route for Users', async () => {
            const resp = await req.post('/users/create')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({firstname: 'TestFirstName', lastname: 'TestLastName', password: 'password123'});
            expect(resp.status).toBe(200);
        });

        it('Update route for Users', async () => {
            const resp = await req.put('/users/5')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({firstname: 'UpdFirstName', lastname: 'UpdLastName'});
            expect(resp.status).toBe(200);
        });

        it('Delete route for Users', async () => {
            const resp = await req.delete('/users/5')
                                    .set('Authorization',`Bearer ${token}`)
            expect(resp.status).toBe(200);
        });

    });

    describe('Product Related Routes', () => {

        let token = '';
        beforeAll(async ():Promise<void> => {
            const resp = await req.post('/login').send({
                id: '4',
                password: 'password123'
            });
            token = resp.body;
        });

        it('Index route for Products', async () => {
            const resp = await req.get('/products');
            expect(resp.status).toBe(200);
        });

        it('Show route for Products', async () => {
            const resp = await req.get('/products/10');
            expect(resp.status).toBe(200);
        });

        it('Create route for Products', async () => {
            const resp = await req.post('/products/create')
                                    .set('Authorization',`Bearer ${token}`)
                                    .send({name: 'Test Product', price: 500, category: 'Test'});
            expect(resp.status).toBe(200);
        });

    });

    describe('Order Related Routes', () => {

        it('Index route for Orders', async () => {
            const resp = await req.get('/orders');
            expect(resp.status).toBe(200);
        });

    });

});