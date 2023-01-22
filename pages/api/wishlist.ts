import { NextApiRequest, NextApiResponse } from 'next';
import { getWishlist, updateWishlist } from 'services/shopify/admin/customer';

export default async function Wishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response;
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    response = await updateWishlist(body.id, body.wishlist);
  } else if (req.method === 'GET') {
    response = await getWishlist(req.query.id as string);
  }
  return res.status(200).json(response);
}
