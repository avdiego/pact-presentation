/* eslint-disable max-len */
import path from 'path';
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import retrieveMonster from '../src/clients/dm-helper';

pactWith(
  {
    port: 8080,
    log: path.resolve(process.cwd(),
      'logs', 'dm-helper.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'dm',
    provider: 'dm-helper',
  },
  (provider) => {
    describe('Pact with dm helper', () => {
      const {
        eachLike, string, integer, term, like,
      } = Matchers;

      const MONSTERS_DATA = {
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
      };
      const monstersSuccessResponse = {
        status: 200,
        headers: {
          Accept: like('application/json, text/plain, */*'),
        },
        body: MONSTERS_DATA,
      };

      const monsterRequest = {
        uponReceiving: 'a request for monsters with given party level',
        withRequest: {
          method: 'GET',
          path: term({
            generate: '/ms/dm-helper/v1/monsters-book/monster/16',
            matcher: '/ms/dm-helper/v1/monsters-book/monster/[0-9]{1,3}',
          }),
          headers: {
            Accept: like('application/json, text/plain, */*'),
          },
        },
      };

      it('returns a successful body', async (done) => {
        provider.addInteraction({
          state: ' i have a monster',
          ...monsterRequest,
          willRespondWith: monstersSuccessResponse,
        });

        const result = await retrieveMonster(7);
        expect(result.data).toEqual(
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
        );
        done();
      });
    });
  },
);
