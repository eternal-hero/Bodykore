import { gql } from 'graphql-request';
import getStorefront from './config';

const storefront = getStorefront();

interface CheckoutUserError {
  code?: string;
  field: string[];
  meassage: string;
}

export interface Checkout {
  id: string;
  email?: string;
  webUrl: string;
  subtotalPriceV2: {
    amount: string;
  };
  lineItems: {
    edges: {
      node: {
        id: string;
        quantity: number;
        variant: {
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
          };
        };
      };
    }[];
  };
}

export interface CheckoutResponse {
  checkout?: Checkout;
  checkoutUserErrors: CheckoutUserError[];
}

/**
 * Checkouts last for 3 months if not completed before.
 */
export const createCheckout = async (
  variantId: string,
  email?: string,
  quantity: number = 1,
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
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
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      lineItems: {
        variantId,
        quantity: quantity,
      },
    },
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.checkoutCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};

export const getCheckout = async (
  checkoutId: string
): Promise<Checkout | undefined> => {
  const query = gql`
    query getCheckout($checkoutId: ID!) {
      node(id: $checkoutId) {
        ... on Checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    checkoutId,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.node === null ? undefined : res.node;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
};

export const updateCheckoutEmail = async (
  checkoutId: string,
  email: string
): Promise<boolean> => {
  const mutation = gql`
    mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          id
          email
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    checkoutId,
    email,
  };
  try {
    const res = await storefront.request(mutation, variables);
    return (
      res.checkoutEmailUpdateV2.checkout !== null 
      // res.checkoutEmailUpdateV2.checkoutUserErrors === []
    );
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return false;
  }
};

export const addItemToCheckout = async (
  checkoutId: string,
  variantId: string,
  quantity: number = 1,
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation checkoutLineItemsAdd(
      $checkoutId: ID!
      $lineItems: [CheckoutLineItemInput!]!
    ) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
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
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    checkoutId,
    lineItems: [
      {
        variantId,
        quantity: quantity,
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.checkoutLineItemsAdd;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};

export const removeItemFromCheckout = async (
  checkoutId: string,
  lineId: string
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
      checkoutLineItemsRemove(
        checkoutId: $checkoutId
        lineItemIds: $lineItemIds
      ) {
        checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
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
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    checkoutId,
    lineItemIds: [lineId],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.checkoutLineItemsRemove;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};

export const updateQuantityCheckout = async (
  checkoutId: string,
  lineId: string,
  quantity: number
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation checkoutLineItemsUpdate(
      $checkoutId: ID!
      $lineItems: [CheckoutLineItemUpdateInput!]!
    ) {
      checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
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
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    checkoutId,
    lineItems: [
      {
        quantity,
        id: lineId,
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.checkoutLineItemsUpdate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};
