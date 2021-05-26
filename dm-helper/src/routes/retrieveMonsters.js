import retrieveMonsters from '../clients/monstersProvider';

export default async (req, res) => {
  const challengeRating = Math.floor(req.params.partyLevel / 4);
  const monstersList = await retrieveMonsters(challengeRating);

  if (!monstersList.data.length) {
    return res.status(404).json({
      message: 'Ups, there is no monsters for you party level',
    });
  }
  res.setHeader('Accept', 'application/json, text/plain, */*');
  return res.json(monstersList.data[Math.floor(Math.random() * (monstersList.data.length - 1))]);
};
