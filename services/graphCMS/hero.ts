import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Heros {
  mainTitle:string;
  subTitle:string;
  url:string;
  media:{
    url:string
  }
}

export const getHeros = async (): Promise<Heros> => {
  const query = gql`
  query MyQuery {
    heroSliders(first: 10) {
      mainTitle
      media {
        url
      }
      subTitle
      url
    }
  }
  
  `;
  const res = await graphcms.request(query);
  return res.heroSliders;
};
