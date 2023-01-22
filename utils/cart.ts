import { SingleItemCartProps } from '@components/ui/bodykore/Cart/SingleCartItem';
import { Cart, getShopifyCollectionQuery } from 'services/shopify/storefront';

export const mapCart = (cart: Cart): SingleItemCartProps[] => {
  const res = cart.lines.edges.map((item) => ({
    name: item.node.merchandise.product.title,
    amount: item.node.quantity,
    available: item.node.merchandise.availableForSale,
    option: item.node.merchandise.title,
    price: +item.node.estimatedCost.subtotalAmount.amount,
    // Using total line price, quantity * price per item,
    // for only price of one item use the following line instead
    // price: +item.node.merchandise.priceV2.amount,
    image: item.node.merchandise.product.featuredImage?.url,
    lineId: item.node.id,
    cartId: cart.id,
  }));
  return res;
};



