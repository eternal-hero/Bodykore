import { gql } from 'graphql-request';
import getAdmin from './config';

const admin = getAdmin();

interface UserError {
  code?: string;
  field: string[];
  message: string;
}

export interface UpdateWishListResponse {
  metafields: { id: string }[];
  userErrors: UserError[];
}

/**
 * Uses private tokens, functions only on server-side,
 * use method from /services/api for client-side
 * @param ownerId 
 * @param items 
 * @returns 
 */
export const updateWishlist = async (
  ownerId: string,
  items: string[]
): Promise<UpdateWishListResponse> => {
  const mutation = gql`
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;
  const variables = {
    metafields: [
      {
        ownerId: `gid://shopify/Customer/${ownerId}`,
        namespace: 'info',
        key: 'wishlist',
        type: 'json',
        value: JSON.stringify(items),
      },
    ],
  };
  try {
    const res = await admin.request(mutation, variables);
    return res.metafieldsSet;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { metafields: [], userErrors: [] };
  }
};

export interface GetWishlistResponse {
  metafield?: { value: string };
}

/**
 * Uses private tokens, functions only on server-side,
 * use method from /services/api for client-side
 * @param id 
 * @returns 
 */
export const getWishlist = async (id: string): Promise<GetWishlistResponse> => {
  const query = gql`
    query customer($id: ID!) {
      customer(id: $id) {
        metafield(namespace: "info", key: "wishlist") {
          value
        }
      }
    }
  `;
  const variables = {
    id: `gid://shopify/Customer/${id}`,
  };
  try {
    const res = await admin.request(query, variables);
    return res.customer === null ? {} : res.customer;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return {};
  }
};
