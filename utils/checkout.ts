import { SingleItemCartProps } from '@components/ui/bodykore/Cart/SingleCartItem';
import { Checkout } from 'services/shopify/storefront';

export const mapCheckout = (checkout: Checkout): SingleItemCartProps[] => {
  const res = checkout.lineItems.edges.map((item) => ({
    name: item.node.variant.product.title,
    amount: item.node.quantity,
    available: item.node.variant.availableForSale,
    option: item.node.variant.title,
    price: +item.node.variant.priceV2.amount * item.node.quantity,
    image: item.node.variant.product.featuredImage?.url,
    lineId: item.node.id,
    cartId: checkout.id,
  }));
  return res;
};
