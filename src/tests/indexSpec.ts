import supertest from 'supertest';
import app from '../server';

const req = supertest(app);

describe('Test if server is running', () => {
    it('Server should be running', async () => {
        const resp = await req.get('/');
        expect(resp.status).toBe(200);
    });
});