import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface Category {
  data: {
    attributes: {
      title: string;
      slug: string;
      image: {
        data: Image;
      };
      subcategories: Category;
    };
  }[];
}

export interface ProductStrapi {
  attributes: {
    title: string;
    description: string;
    descriptionImage: {
      data: Image;
    };
    handle: string;
    technologies: {
      data: {
        attributes: {
          title: string;
          description: string;
          image: {
            data: Image;
          };
          iconImage: {
            data: Image;
          };
        };
      }[];
    };
    accessoriesIncluded: string;
    attachmentsIncluded: string;
    feature: {
      title: string;
      subFeature: {
        title: string;
        description: string;
        images: {
          data: Image[];
        };
      }[];
    }[];
    gallery: { data: Image[] };
    videos: {
      data: {
        attributes: {
          videoUrl: string;
          title: string;
        };
      }[];
    };
    techologies: {
      data: {
        attributes: {
          title: string;
          image: { data: Image };
          description: string;
          iconImage: { data: Image };
        };
      }[];
    };
    file3d: { data: Image };
    specification: {
      dimensions: string;
      weight: string;
      footprint: string;
      frame: string;
      frameColor: string;
      weightStack: string;
      ofAdjustableHeightPositions: string;
      ofWeightPegs: string;
      counterBalancedSmithMachine: string;
      halfRackFunction: string;
      dualPulleySystem: string;
      accessoryStorage: string;
      multiGripPullUpHandles: string;
      barStorage: string;
      bodyGroupTarget: string;
      ofWorkouts: string;
      assemblyTime: string;
      ofAdjustableBackPositions: string;
      ofFoamRollerAdjustments: string;
      cushionMaterial: string;
      cushionDimensions: string;
      angles: string;
      wheels: string;
      footrest: string;
      handle: string;
      ofAdjustableSeatPositions: string;
    
      image: {
        data: Image;
      };
    };
  };
}

export interface Image {
  attributes: {
    name: string;
    url: string;
    height: number;
    width: number;
  };
}

export const getStrapiCategories = async (): Promise<Category> => {
  const query = gql`
    query ProductCategories {
      categories {
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
            subcategories {
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
  `;
  const res = await graphcms.request(query);
  return res.categories;
};
type FilterProduct = {
  filter: {
    handle: {
      eq: string;
    };
  };
};
export const getStrapiProduct = async (
  handle: String
): Promise<ProductStrapi> => {
  const query = gql`
    query Products($handle: String!) {
      products(filters: { handle: { eq: $handle } }) {
        data {
          attributes {
            title
            description
            descriptionImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            handle
            technologies {
              data {
                attributes {
                  title
                  description
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
            accessoriesIncluded
            attachmentsIncluded
            technologies{
              data{
                attributes{
                  title
                  description
                  image{
                    data{
                      attributes{
                        url
                        height
                        width
                      }
                    }
                  }
                  iconImage{
                    data{
                      attributes{
                        url
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
            feature {
              title
              subFeature {
                title
                description
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
              }
            }
            gallery {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            videos {
              data {
                attributes {
                  videoUrl
                  title
                }
              }
            }
            file3d {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            specification {
              dimensions
              weight
              footprint
              frame
              frameColor
              weightStack
              ofAdjustableHeightPositions
              ofWeightPegs
              counterBalancedSmithMachine
              halfRackFunction
              dualPulleySystem
              accessoryStorage
              multiGripPullUpHandles
              barStorage
              bodyGroupTarget
              ofWorkouts
              assemblyTime
              ofAdjustableBackPositions
              ofFoamRollerAdjustments
              cushionMaterial
              cushionDimensions
              angles
              wheels
              footrest
              handle
              ofAdjustableSeatPositions
              image {
                data {
                  attributes {
                    url
                    width
                    height
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
    handle,
  };
  const res = await graphcms.request(query, variables);
  return res.products.data[0];
};
export const getStrapiCompareProduct = async (
  handle1: string = 'a',
  handle2: string = 'a',
  handle3: string = 'a'
): Promise<ProductStrapi[]> => {
  const query = gql`
    query Products($handle1: String, $handle2: String, $handle3: String) {
      products(
        filters: {
          or: [
            { handle: { eq: $handle1 } }
            { handle: { eq: $handle2 } }
            { handle: { eq: $handle3 } }
          ]
        }
      ) {
        data {
          attributes {
            title
            description
            descriptionImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            handle
            technologies {
              data {
                attributes {
                  title
                  description
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
            accessoriesIncluded
            attachmentsIncluded
            feature {
              title
              subFeature {
                title
                description
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
              }
            }
            gallery {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            videos {
              data {
                attributes {
                  videoUrl
                  title
                }
              }
            }
            file3d {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            specification {
              dimensions
              weight
              footprint
              frame
              frameColor
              weightStack
              ofAdjustableHeightPositions
              ofWeightPegs
              counterBalancedSmithMachine
              halfRackFunction
              dualPulleySystem
              accessoryStorage
              multiGripPullUpHandles
              barStorage
              bodyGroupTarget
              ofWorkouts
              assemblyTime
              image {
                data {
                  attributes {
                    url
                    width
                    height
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
    handle1,
    handle2,
    handle3,
  };

  const res = await graphcms.request(query, variables);
  return res.products.data;
};
