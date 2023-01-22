import Cookies from 'js-cookie';
import ls from 'localstorage-slim';
import { getWishlistAPI, updateWishlistAPI } from 'services/api';

export const initWishlist = async (): Promise<Set<string>> => {
  const customerId = Cookies.get('customerId');
  const local = ls.get<string[]>('wishlist', { decrypt: true });
  if (customerId !== undefined) {
    const res = await getWishlistAPI(customerId);
    let wishlist = new Set<string>();
    if (res) {
      wishlist = new Set(JSON.parse(res));
    }
    if (local) {
      local.forEach((item) => wishlist.add(item));
      updateWishlist(wishlist);
    }
    ls.remove('wishlist');
    return wishlist;
  } else if (local) {
    return new Set(local);
  }
  return new Set();
};

export const updateWishlist = async (wishlist: Set<string>) => {
  const customerId = Cookies.get('customerId');
  if (customerId !== undefined) {
    await updateWishlistAPI(customerId, [...wishlist]);
  } else {
    ls.set('wishlist', [...wishlist], { encrypt: true });
  }
};
