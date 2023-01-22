import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Store {
  title: string;
  address: string;
  phoneNumber: string;
  email: string,
  coordinates: Coordinates;
}

export const getAllStores = async (): Promise<Store[]> => {
  const query = gql`
    query AllStores {
      stores(first:50) {
        title
        address
        phoneNumber
        email
        coordinates {
          latitude
          longitude
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.stores;
};
