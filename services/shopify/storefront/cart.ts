import { gql } from 'graphql-request';
import getStorefront from './config';

const storefront = getStorefront();

interface CartUserError {
  code?: string;
  field: string[];
  meassage: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        estimatedCost: {
          subtotalAmount: {
            amount: string;
            currencyCode: string;
          }
        }
        merchandise: {
          id: string;
          availableForSale: boolean;
          title: string;
          product: {
            title: string;
            featuredImage?: {
              url: string;
            };
          };
          priceV2: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartChangeResponse {
  cart?: Cart;
  userErrors: CartUserError[];
}

export const createCart = async (
  merchandiseId?: string,
  quantity: number = 1,
  customerAccessToken?: string
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation CreateCart($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  let variables: any = { input: {} };
  if (merchandiseId !== undefined) {
    variables.input.lines = [{ merchandiseId, quantity }];
  }
  if (customerAccessToken !== undefined) {
    variables.input.buyerIdentity = { customerAccessToken };
  }
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};

export const getCart = async (id: string): Promise<Cart | undefined> => {
  const query = gql`
    query Cart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              estimatedCost {
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  availableForSale
                  title
                  product {
                    title
                    featuredImage {
                      url
                    }
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  const variables = {
    id,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.cart === null ? undefined : res.cart;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
};

export const updateItemQuantity = async (
  cartId: string,
  id: string,
  quantity: number
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [
      {
        id,
        quantity,
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartLinesUpdate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};

export const removeItemFromCart = async (
  cartId: string,
  id: string
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lineIds: [id],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartLinesRemove;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};

export const addItemToCart = async (
  cartId: string,
  merchandiseId: string,
  quantity?: number
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [
      {
        merchandiseId,
        quantity,
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartLinesAdd;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};
