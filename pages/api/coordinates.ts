import { NextApiRequest, NextApiResponse } from 'next';
import { getCoordinates } from 'services/geoapify';

export default async function Coordinates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const coords = await getCoordinates(req.query.zipCode as string);
  if (coords !== undefined) {
    return res.status(200).json(coords);
  }
  return res.status(400).end();
}
