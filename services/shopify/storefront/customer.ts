import { gql } from 'graphql-request';
import getStorefront from './config';

const storefront = getStorefront();

interface CustomerUserError {
  code?: string;
  field: string[];
  message: string;
}

export interface CreateCustomerResponse {
  customerUserErrors: CustomerUserError[];
  customer?: {
    id: string;
  };
}

export const createCustomer = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  acceptsMarketing?: boolean
): Promise<CreateCustomerResponse> => {
  const mutation = gql`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing,
    },
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.customerCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface CreateCustomerTokenResponse {
  customerUserErrors: CustomerUserError[];
  customerAccessToken?: {
    accessToken: string;
    expiresAt: string;
  };
}

export const createCustomerToken = async (
  email: string,
  password: string
): Promise<CreateCustomerTokenResponse> => {
  const query = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
    },
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customerAccessTokenCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface ReciverCustomerPasswordResponse {
  customerUserErrors: CustomerUserError[];
}

export const recoverCustomerPassword = async (email: string) => {
  const mutation = gql`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    email,
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.customerRecover;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { customerUserErrors: [] };
  }
};

export interface Order {
  node: {
    id: string;
  };
}

export const getCustomerOrders = async (
  customerAccessToken: string
): Promise<Order[]> => {
  const query = gql`
    query Orders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const variables = {
    customerAccessToken,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customer === null ? [] : res.customer.orders.edges;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return [];
  }
};

export const getCustomerId = async (customerAccessToken: string): Promise<string | undefined> => {
  const query = gql`
    query CustomerID($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
      }
    }
  `;
  const variables = {
    customerAccessToken,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.customer === null ? undefined : res.customer.id;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return undefined;
  }
};
