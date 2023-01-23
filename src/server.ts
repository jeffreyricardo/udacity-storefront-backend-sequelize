import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import db from './db-config';
import router from './routes/routes';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

try {
    db.authenticate();
    console.log('Database Connection Successful');
} catch (err) {
    console.log(`Error connecting to database.  Error: ${err}`);
}

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World Default Route!')
});

app.use(router);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
