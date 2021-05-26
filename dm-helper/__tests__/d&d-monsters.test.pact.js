/* eslint-disable max-len */
import path from 'path';
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import retrieveMonsters from '../src/clients/monstersProvider';

pactWith(
  {
    port: 8082,
    log: path.resolve(process.cwd(),
      'logs', 'd&d-monsters.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'dm-helper',
    provider: 'd&d-monsters',
  },
  (provider) => {
    describe('Pact with d&d monsters', () => {
      const {
        eachLike, string, integer, term, like,
      } = Matchers;

      const MONSTERS_DATA = eachLike({
        name: string('Aboleth'),
        description: string(''),
        image: string(''),
        hitPoints: integer(140),
        ac: integer(16),
        speed: integer(40),
        actions: eachLike({
          type: string('Melee Weapon Attack'),
          description: string(''),
        }),
        savingThrows: {
          dex: integer(7),
          con: integer(15),
          wis: integer(10),
          cha: integer(12),
        },
      });
      const monstersSuccessResponse = {
        status: 200,
        headers: {
          Accept: like('application/json, text/plain, */*'),
        },
        body: MONSTERS_DATA,
      };

      const monstertListRequest = {
        uponReceiving: 'a request for monsters with given party level',
        withRequest: {
          method: 'GET',
          path: term({
            generate: '/ms/d&d-monsters/v1/monsters/challenge-rating/7',
            matcher: '/ms/d&d-monsters/v1/monsters/challenge-rating/[0-9]{1,3}',
          }),
          headers: {
            Accept: like('application/json, text/plain, */*'),
          },
        },
      };

      it('returns a successful body', async (done) => {
        provider.addInteraction({
          state: ' i have a list of monsters',
          ...monstertListRequest,
          willRespondWith: monstersSuccessResponse,
        });

        const result = await retrieveMonsters(7);
        expect(result.data).toEqual([
          {
            name: 'Aboleth',
            description: '',
            image: '',
            hitPoints: 140,
            ac: 16,
            speed: 40,
            actions: [{
              description: '',
              type: 'Melee Weapon Attack',
            }],
            savingThrows: {
              dex: 7, con: 15, wis: 10, cha: 12,
            },
          },
        ]);
        done();
      });
    });
  },
);
