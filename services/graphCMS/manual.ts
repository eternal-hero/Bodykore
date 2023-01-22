import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Manual {
  title: string;
  reference: string;
  image?: { url: string };
  manualCategory?: {
    title: string;
    slug: string;
  };
  file?: { url: string };
  product?: { handle: string };
}

export const getAllManuals = async (): Promise<Manual[]> => {
  const query = gql`
    query AllManuals {
      manuals(first:${50}) {
        title
        reference
        image {
          url
        }
        manualCategory {
          title
          slug
        }
        file {
          url
        }
        product {
          handle
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.manuals;
};

export interface ManualCategory {
  slug: string;
  title: string;
}

export const getManualCategories = async () => {
  const query = gql`
    query ManualCategories {
      manualCategories {
        slug
        title
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.manualCategories;
};

export const getManualsOfCategory = async (slug: string): Promise<Manual[]> => {
  const query = gql`
    query ManualsOfCategory($slug: String!) {
      manualCategory(where: { slug: $slug }) {
        manuals {
          title
          image {
            url
          }
          manualCategory {
            title
            slug
          }
          file {
            url
          }
          product {
            handle
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.manualCategory === null ? [] : res.manualCategory.manuals;
};
