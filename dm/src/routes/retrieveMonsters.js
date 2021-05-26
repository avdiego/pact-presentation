import retrieveMonster from '../clients/dm-helper';

export default async (req, res) => {
  const { data: { description, image } } = await retrieveMonster(req.params.partyLevel);

  return res.json({ description, image });
};
