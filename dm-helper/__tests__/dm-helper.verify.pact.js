/* eslint-disable no-console */
import express from 'express';
import { Verifier } from '@pact-foundation/pact';
import dotenv from 'dotenv';
import { version } from '../package.json';
import routerConfig from '../src/routes/index';

dotenv.config({ silent: true });

const app = express();
const router = express.Router();
app.use('/ms/dm-helper/v1', routerConfig(router));

describe('Pact Verification: dm-helper', () => {
  const port = 3000;
  const opts = {
    provider: 'dm-helper',
    providerBaseUrl: `http://localhost:${port}`,
    pactBrokerUrl: 'https://dacosta.pactflow.io',
    pactBrokerToken: process.env.PACT_TOKEN,
    publishVerificationResult: true,
    providerVersion: version,
  };
  let server;
  beforeAll(() => {
    server = app.listen(port, () => {
      console.log(`Provider service listening on http://localhost:${port}`);
    });
  });
  afterAll(() => {
    server.close();
  });

  it('should verify consumer contract', async (done) => {
    const output = await (new Verifier(opts));
    const verify = await output.verifyProvider();
    console.log('Pact Verification Complete!');
    console.log(verify);
    done();
  }, 10000);
});
