import { CardProps } from '@components/ui/bodykore/Cards/SellCardsaddon';
import { SingleItemCartProps } from '@components/ui/bodykore/Cart/SingleCartItem';
import { atom } from 'recoil';

export const menuSidebarOpenState = atom({
  key: 'menuSidebarOpen', // unique ID
  default: false, // default value
});

export const cartSidebarOpenState = atom({
  key: 'cartSidebarOpen', // unique ID
  default: false, // default value
});

export const searchOpenState = atom({
  key: 'searchOpen',
  default: false,
});

export const cartItemsState = atom<SingleItemCartProps[]>({
  key: 'cartItems',
  default: [],
});

export const checkoutUrlState = atom<string | undefined>({
  key: 'checkoutUrl',
  default: undefined,
});

export const cartTotalState = atom<string | undefined>({
  key: 'cartTotal',
  default: undefined,
});
