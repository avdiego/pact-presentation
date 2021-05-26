import express from 'express';
import routerConfig from './routes/index';

const app = express();
const port = 4200;
const router = express.Router();

app.use('/ms/dm/v1', routerConfig(router));

app.listen(port);

// eslint-disable-next-line no-console
console.log(`Listening on port ${port}`);
