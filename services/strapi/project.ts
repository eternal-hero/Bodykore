import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image, ProductStrapi } from './product';

const graphcms = getStrapicms();

export interface ProjectCategoryStrapi {
  data: {
    attributes: {
      title: string;
      slug: string;
      image: {
        data: Image;
      };
      viewHome: boolean;
      projects: {
        data: ProjectStrapi[];
      };
    };
  }[];
}

export interface ProjectStrapi {
  attributes: {
    title: string;
    subTitle: string;
    description: string;
    slug: string;
    products: {
      data: ProductStrapi[];
    };
    image: {
      data: Image[];
    };
    projectCategory: ProjectCategoryStrapi;
  };
}

export const getStrapiProjectCategories = async (
  viewHome: boolean = true
): Promise<ProjectCategoryStrapi> => {
  const query = gql`
    query ProjectCategories($viewHome: Boolean) {
      projectCategories(filters: { viewHome: { eq: $viewHome } }) {
        data {
          attributes {
            title
            slug
            image {
              data {
                attributes {
                  name
                  url
                  height
                  width
                }
              }
            }
            viewHome
            projects {
              ... on ProjectRelationResponseCollection {
                data {
                  attributes {
                    title
                    slug
                    image {
                      data {
                        attributes {
                          name
                          url
                          height
                          width
                        }
                      }
                    }
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
    viewHome,
  };
  const res = await graphcms.request(query, variables);
  return res.projectCategories;
};

export const getStrapiProject = async (
  slug: string = 'beverly-hills'
): Promise<ProjectStrapi> => {
  const query = gql`
    query Projects($slug: String) {
      projects(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            title
            slug
            subTitle
            description
            image {
              data {
                attributes {
                  name
                  url
                  height
                  width
                }
              }
            }
            products {
              ... on ProductRelationResponseCollection {
                data {
                  attributes {
                    title
                    handle
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
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.projects.data[0];
};
