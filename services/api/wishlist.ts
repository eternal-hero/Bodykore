import routes from '@config/routes';
import { getCustomerId } from 'services/shopify/storefront';

/**
 * Return the wishlist in string format, use JSON.parse()
 */
export const getWishlistAPI = async (
  id: string
): Promise<string | undefined> => {
  const res = await fetch(`${routes.api.wishlist.path}?id=${id}`, { method: 'GET' });
  const resJson = await res.json();
  return resJson.metafield?.value;
};

export const updateWishlistAPI = async (
  id: string,
  wishlist: string[]
): Promise<string | undefined> => {
  const data = {
    id,
    wishlist,
  };
  const body = JSON.stringify(data);
  const res = await fetch(routes.api.wishlist.path, { method: 'POST', body });
  const resJson = await res.json();
  return resJson.metafields[0].id;
};
