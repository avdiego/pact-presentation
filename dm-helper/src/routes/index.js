import retrieveMonsters from './retrieveMonsters';

/**
 * Setup of the service routes.
 * @param {object} router - express Router.
 */

export default (router) => {
  router.get('/monsters-book/monster/:partyLevel', retrieveMonsters);
  return router;
};
