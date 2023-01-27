import supertest from 'supertest';
import app from '../../server';
import db from '../../db-config';
import User from '../../models/user';

const req = supertest(app);

try {
    db.authenticate();
} catch (err) {
    console.log(`Error connecting to database.  Error: ${err}`);
}

describe('User Model', () => {

    beforeAll(() => {
        User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    afterAll(() => {
        User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    });

    it('Create User', async () => {
        const user = await User.create({
            firstname: 'Cliff',
            lastname: 'Bishop',
            password: 'password123'
        });
        expect(user).toBeInstanceOf(User);
    });

    it('Get Users', async () => {
        const user = await User.findAll();
        expect(user).toBeDefined();
    });

    it('Get User By ID', async () => {
        const user = await User.findByPk(1);
        expect(user).toBeInstanceOf(User);
    });

    it('Update User', async () => {
        const user = await User.update({
            firstname: 'CliffUpd',
            lastname: 'BishopUpd',
        },
        {
            returning: true,
            where: {id: 1}

        });
        expect(user).toBeDefined();
    });
    
    it('Delete User', async () => {
        const user = await User.destroy({
            where: {id: 1}
        });
        expect(user).toBeDefined();
    });
});
