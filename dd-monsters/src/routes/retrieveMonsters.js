import monstersDB from '../../resources/monstersDB';

export default async (req, res) => {
  const { challengeRating } = req.params;
  res.setHeader('Accept', 'application/json, text/plain, */*');
  return res.json(monstersDB.filter((monster) => monster.challengeRating === +challengeRating));
};
