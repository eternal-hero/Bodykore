import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Subcategory {
  name: string;
  slug?: string;
}

export const getTypesOf = async (slug: string): Promise<Subcategory[]> => {
  const query = gql`
    query TypesOf($slug: String!) {
      category(where: { slug: $slug }) {
        subcategories {
          name
          slug
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.category?.subcategories || [];
};

export interface CategorySlug {
  slug: string;
}

export const getAllCategoriesSlug = async (): Promise<CategorySlug[]> => {
  const query = gql`
    query ProductCategories {
      categories {
        slug
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.categories;
};
export interface Richtext {
  html: string;
  markdown: string;
  text: string;
}

export interface CMSCollectionPage {
  category?: {
    cover: {
      url: string;
    };
    discover: {
      url: string;
    }
    features: {
      title: string;
      description: Richtext;
      image: {
        url: string;
      }[];
      subFeature: {
        title: string;
        description: Richtext;
        image: {
          url: string;
        }[];
      }
    }[];
    subcategories: {
      name: string;
      image?: {
        url: string;
      };
    }[];
  };
  projectCategories: {
    title: string;
    projects: {
      slug: string;
      image: {
        url: string;
      }[];
    }[];
  }[];
}

export const getCMSCollectionPage = async (
  slug: string
): Promise<CMSCollectionPage> => {
  const query = gql`
    query CollectionPage($slug: String!) {
      category(where: { slug: $slug }) {
        cover {
          url
        }
        discover {
          url
        }
        features {
          title,
          description{
            html
            markdown,
            text
          }
          image {
            url
          }
        }
        subcategories {
          name
          image {
            url
          }
        }
      }
      projectCategories {
        title
        projects(first: 1, orderBy: publishedAt_DESC) {
          slug
          image(first: 1) {
            url
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res;
};


export interface ProductProps {
  description: Richtext;
  handle: string;
  video: {
    title: string;
    video: string;
  }[];
  features: {
    title: string;
    description: Richtext;
    image: {
      url: string;
    }[],
    subFeature: {
      title: string;
      description: Richtext;
      image: {
        url: string;
      }[],
    }[]
  }[];
  featurecategories: {
    title: string;
    features: {
      title: string;
      images: {
        url: string;
      }[],
      description: Richtext
    }[]
  }[]
  gallery: {
    url: string;
  }[],
  specification: {
    image: {
      url: string;
    }
    specificationList: string[]
  }[];
  shortFeatures: string[];
  descriptionImage: {
    url: string;
  };
  partner: {
    url: string;
  }[]
}

export const getSingleProduct = async (
  handle: string
): Promise<ProductProps> => {
  const query = gql`
    query SingleProduct($handle: String) {
      product(where: { handle: $handle }) {
       description {
        html
       }
       handle
       video {
        ... on Video {
          title
          video
        }
       }
       features {
        ... on Feature {
          title
          description {
            html
            markdown
            text
          }
          image {
            url
          }
          subFeature {
            ... on Feature {
              title
              description {
                html
                markdown
                text
              }
              image {
                url
              }
            }
          }
        }
       }
       gallery {
        url
       }
       specification {
        ... on Specification {
          image {
            url
          }
          specificationList
        }
       }
       shortFeatures
       descriptionImage {
        url
       }
       partner {
        url
       }
       featurecategories {
        ... on FeatureCategory {
          title
          features {
            ... on FeatureTables {
              title
              images {
                url
              }
              description {
                text
                html
                markdown
              }
            }
          }
        }
      }
    }
    }
  `;
  const variables = {
    handle,
  };
  const res = await graphcms.request(query, variables);
  return res.product;
};



export const getCompareProducts = async (
  where: object
): Promise<ProductProps[]> => {
  const query = gql`
    query CompareProducts($where: ProductWhereInput!) {
      products(where: $where) {
        description {
          html
        }
        handle
        video {
          ... on Video {
            title
            video
          }
        }
        features {
          ... on Feature {
            title
            description {
              html
              markdown
              text
            }
            image {
              url
            }
            subFeature {
              ... on Feature {
                title
                description {
                  html
                  markdown
                  text
                }
                image {
                  url
                }
              }
            }
          }
        }
        gallery {
          url
        }
        specification {
          ... on Specification {
            image {
              url
            }
            specificationList
          }
        }
        shortFeatures
        descriptionImage {
          url
        }
        partner {
          url
        }
        featurecategories {
          ... on FeatureCategory {
            title
            features {
              ... on FeatureTables {
                title
                images {
                  url
                }
                description {
                  text
                  html
                  markdown
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    where,
  };
  const res = await graphcms.request(query, variables);
  return res.products;
};

