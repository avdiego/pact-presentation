import publisher from '@pact-foundation/pact-node';
import path from 'path';
import dotenv from 'dotenv';
import { version } from './package.json';

dotenv.config({ silent: true });

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'https://dacosta.pactflow.io',
  pactBrokerToken: process.env.PACT_TOKEN,
  consumerVersion: version,
};
publisher.publishPacts(opts);
