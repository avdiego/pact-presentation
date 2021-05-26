import express from 'express';
import routerConfig from './routes/index';

const app = express();
const port = 8080;
const router = express.Router();

app.use('/ms/dm-helper/v1', routerConfig(router));

app.listen(port);

// eslint-disable-next-line no-console
console.log(`Listening on port ${port}`);
