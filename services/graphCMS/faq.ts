import { gql } from 'graphql-request';
import getGraphcms from './config';
import { Richtext } from './product';

const graphcms = getGraphcms();

export interface Faqs {
  faqTypes: {
    name: string;
  }[];
  faqs: {
    question: string;
    answer:Richtext;
    faqType?: {
      name: string;
    };
  }[];
}

export const getFaqs = async (): Promise<Faqs> => {
  const query = gql`
    query FAQ {
      faqTypes {
        name
      }
      faqs(first:50) {
        question
        answer {
          html
          markdown,
          text
        }
        faqType {
          name
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res;
};
