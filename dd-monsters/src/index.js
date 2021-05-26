import express from 'express';
import routerConfig from './routes/index';

const app = express();
const port = 8082;
const router = express.Router();

app.use('/ms/d&d-monsters/v1', routerConfig(router));

app.listen(port);

// eslint-disable-next-line no-console
console.log(`Listening on port ${port}`);
