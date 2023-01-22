import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface DynamicPages {
  projects: {
    title: string;
    slug: string;
  }[];
  articles: {
    title: string;
    slug: string;
  }[];
}

export const getSearchItems = async (): Promise<DynamicPages> => {
  const query = gql`
    query Search {
      projects {
        title
        slug
      }
      articles {
        title
        slug
      }
    }
  `;
  const res = await graphcms.request(query);
  return res;
};
