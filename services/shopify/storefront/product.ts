import { gql } from 'graphql-request';
import { StringNullableChain } from 'lodash';
import getStorefront from './config';

const storefront = getStorefront();

export enum Sort {
  TitleAsc,
  TitleDesc,
  PriceAsc,
  PriceDesc,
  BestSelling,
}

export interface Filters {
  title?: string;
  type?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductInfo {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;

  metafield?: {
    value: string;
  };
  featuredImage?: {
    url: string;
    height?: string;
    width?: string;
  };
  variants: {
    edges: {
      node: {
        id: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        compareAtPriceV2?: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

export interface GetAllProductsResponse {
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  edges: {
    cursor: string;
    node: ProductInfo;
  }[];
}

export const getAllProducts = async (
  numProducts: number,
  cursor?: string,
  { title, type, tag, minPrice, maxPrice }: Filters = {},
  sort?: Sort
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query AllProducts(
      $numProducts: Int!
      $cursor: String
      $query: String
      $sortKey: ProductSortKeys
      $reverse: Boolean
    ) {
      products(
        first: $numProducts
        after: $cursor
        query: $query
        sortKey: $sortKey
        reverse: $reverse
      ) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            description
            availableForSale
            featuredImage {
              url
              height
              width
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  let filters = '';
  if (title !== undefined) {
    filters += `title:${title}* `;
  }
  if (type !== undefined) {
    filters += `product_type:${type} `;
  }
  if (tag !== undefined) {
    filters += `tag:${tag} `;
  }
  if (minPrice !== undefined) {
    filters += `variants.price:>=${minPrice.toFixed(2)} `;
  }
  if (maxPrice !== undefined) {
    filters += `variants.price:<=${maxPrice.toFixed(2)} `;
  }
  let sortKey, reverse;
  switch (sort) {
    case Sort.TitleAsc:
      reverse = false;
      sortKey = 'TITLE';
      break;
    case Sort.TitleDesc:
      reverse = true;
      sortKey = 'TITLE';
      break;
    case Sort.PriceAsc:
      reverse = false;
      sortKey = 'PRICE';
      break;
    case Sort.PriceDesc:
      reverse = true;
      sortKey = 'PRICE';
      break;
    case Sort.BestSelling:
      reverse = false;
      sortKey = 'BEST_SELLING';
      break;
    default:
      break;
  }
  const variables = {
    numProducts,
    cursor,
    query: filters !== '' ? filters : undefined,
    sortKey,
    reverse,
  };
  const res = await storefront.request(query, variables);
  return res.products;
};

export const getCountOfAllProducts = async ({
  title,
  type,
  tag,
  minPrice,
  maxPrice,
}: Filters = {}): Promise<number> => {
  const query = gql`
    query AllProducts($query: String) {
      products(first: 250, query: $query) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  let filters = '';
  if (title !== undefined) {
    filters += `title:${title}* `;
  }
  if (type !== undefined) {
    filters += `product_type:${type} `;
  }
  if (tag !== undefined) {
    filters += `tag:${tag} `;
  }
  if (minPrice !== undefined) {
    filters += `variants.price:>=${minPrice.toFixed(2)} `;
  }
  if (maxPrice !== undefined) {
    filters += `variants.price:<=${maxPrice.toFixed(2)} `;
  }
  const variables = {
    query: filters !== '' ? filters : undefined,
  };
  const res = await storefront.request(query, variables);
  return res.products.edges.length;
};

interface ProductSlug {
  node: {
    handle: string;
  };
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {
  const query = gql`
    query AllProductsSlug {
      products(first: 100) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  const res = await storefront.request(query);
  return res.products.edges;
};

/**
 * Unlike allProducts, it can only filter by price.
 * @param handle
 * @param numProducts
 * @param cursor
 * @param param3
 * @param sort
 * @returns
 */
export const getProductsOfCollection = async (
  handle: string,
  numProducts: number,
  cursor?: string,
  { minPrice, maxPrice }: Filters = {},
  sort?: Sort
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query ProductsOfCollection(
      $handle: String!
      $numProducts: Int!
      $cursor: String
      $filters: [ProductFilter!]
      $sortKey: ProductCollectionSortKeys
      $reverse: Boolean
    ) {
      collection(handle: $handle) {
        products(
          first: $numProducts
          after: $cursor
          filters: $filters
          sortKey: $sortKey
          reverse: $reverse
        ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              handle
              title
              description
              availableForSale
              featuredImage {
                url
                height
                width
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
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
  let sortKey, reverse;
  switch (sort) {
    case Sort.TitleAsc:
      reverse = false;
      sortKey = 'TITLE';
      break;
    case Sort.TitleDesc:
      reverse = true;
      sortKey = 'TITLE';
      break;
    case Sort.PriceAsc:
      reverse = false;
      sortKey = 'PRICE';
      break;
    case Sort.PriceDesc:
      reverse = true;
      sortKey = 'PRICE';
      break;
    case Sort.BestSelling:
      reverse = false;
      sortKey = 'BEST_SELLING';
      break;
    default:
      break;
  }
  const filters = [
    {
      price: {
        min: minPrice,
        max: maxPrice,
      },
    },
  ];
  const variables = {
    handle,
    numProducts,
    cursor,
    filters,
    sortKey,
    reverse,
  };
  const res = await storefront.request(query, variables);
  return res.collection.products;
};

export const getCountOfProductsOfCollection = async (
  handle: string,
  { minPrice, maxPrice }: Filters = {}
): Promise<number> => {
  const query = gql`
    query ProductsOfCollection($handle: String!, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(first: 250, filters: $filters) {
          edges {
            node {
              handle
            }
          }
        }
      }
    }
  `;
  const filters = [
    {
      price: {
        min: minPrice,
        max: maxPrice,
      },
    },
  ];
  const variables = {
    handle,
    query: filters,
  };
  const res = await storefront.request(query, variables);
  return res.collection.products.edges.length;
};

export const getProductsWithTitle = async (term: string) => {
  const query = gql`
    query ProductsWithTitle($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            productType
          }
        }
      }
    }
  `;
  const variables = {
    query: `title:*${term}*`,
  };
  const res = await storefront.request(query, variables);
  return res.products;
};

export interface Product {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  description: string;
  images: {
    edges: {
      node: {
        url: string;
        height?: number;
        width?: number;
      };
    }[];
  };
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
      };
    }[];
  };
  productType: string;
  descSummary?: {
    value: string;
  };
  descFeatures?: {
    value: string;
  };
  descImage?: {
    value: string;
  };
  highList?: {
    value: string;
  };
  highImages?: {
    value: string;
  };
  keyFactor?: {
    value: string;
  };
  specList?: {
    value: string;
  };
  specImages?: {
    value: string;
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        image?: {
          url: string;
        };
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        compareAtPriceV2?: {
          amount: string;
          currencyCode: string;
        };
        quantityAvailable:{
          amount: number;
        }
      };
    }[];
  };
}

export const getProduct = async (
  handle: string
): Promise<Product | undefined> => {
  const query = gql`
    query SingleProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        availableForSale
        description
        images(first: 10) {
          edges {
            node {
              url
              height
              width
            }
          }
        }
        collections(first: 1) {
          edges {
            node {
              title
              handle
            }
          }
        }
        productType
        descSummary: metafield(
          namespace: "global"
          key: "Description-Summary"
        ) {
          value
        }
        descFeatures: metafield(
          namespace: "global"
          key: "Description-Features"
        ) {
          value
        }
        descImage: metafield(namespace: "global", key: "Description-Image") {
          value
        }
        highList: metafield(namespace: "global", key: "Highlights-List") {
          value
        }
        highImages: metafield(namespace: "global", key: "Highlights-Images") {
          value
        }
        keyFactor: metafield(
          namespace: "global"
          key: "Key-Factor-Perfomance"
        ) {
          value
        }
        specList: metafield(namespace: "global", key: "Specification-List") {
          value
        }
        specImages: metafield(
          namespace: "global"
          key: "Specification-Images"
        ) {
          value
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              image {
                url
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
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
  const res = await storefront.request(query, variables);
  return res?.product === null ? undefined : res.product;
};

export const getProductCard = async (handle: string): Promise<ProductInfo> => {
  const query = gql`
    query SingleProductCard($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          height
          width
        }
        variants(first: 1) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
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
  const res = await storefront.request(query, variables);
  return res?.product === null ? undefined : res.product;
};

/**
 * Returns a maximum of 10 products, but it may also be empty.
 * @param productId
 * @returns
 */
export const getProductRecommendations = async (
  productId: string
): Promise<ProductInfo[]> => {
  const query = gql`
    query ProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          height
          width
        }
        variants(first: 1) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    productId,
  };
  const res = await storefront.request(query, variables);
  return res.productRecommendations;
};

export interface Collection {
  node: {
    title: string;
    handle: string;
    products: {
      edges: {
        node: {
          productType: string;
        };
      }[];
    };
  };
}

export const getProductCollections = async (): Promise<Collection[]> => {
  const query = gql`
    query ProductCollections {
      collections(first: 100) {
        edges {
          node {
            title
            handle
            products(first: 10) {
              edges {
                node {
                  productType
                }
              }
            }
          }
        }
      }
    }
  `;
  const res = await storefront.request(query);
  return res.collections.edges;
};
export interface ProductSearchInfo {
  node: {
    handle: string;
    title: string;
    featuredImage:{
      url: string;
    }
  };
}

export const searchProducts = async (
  numProducts: number,
  term: string
): Promise<ProductSearchInfo[]> => {
  const query = gql`
    query SearchProducts($numProducts: Int!, $query: String) {
      products(first: $numProducts, query: $query) {
        edges {
          node {
            handle
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;
  const variables = {
    numProducts,
    query: term,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.products.edges;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface CollectionHeader {
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
        image: {
          url: string;
        };
      };
    }[];
  };
  collection: {
    products: {
      edges: {
        node: {
          title: string;
          handle: string;
        };
      }[];
    };
  };
}

export const getCollectionsHeader = async (): Promise<CollectionHeader> => {
  const query = gql`
    query CollectionsHeader {
      collections(first: 100, sortKey: TITLE) {
        edges {
          node {
            title
            handle
            image {
              url
            }
          }
        }
      }
      collection(handle: "packages") {
        products(first: 6, sortKey: BEST_SELLING) {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    }
  `;
  const res = await storefront.request(query);
  return res;
};

export interface ShopifyCollectionPage {
  title: string;
  description: string;
  products: {
    edges: {
      node: ProductInfo;
    }[];
  };
}

export const getShopifyCollectionPage = async (
  handle: string
): Promise<ShopifyCollectionPage | undefined> => {
  const query = gql`
    query CollectionPage($handle: String!) {
      collection(handle: $handle) {
        title
        description
        products(first: 4, sortKey: BEST_SELLING) {
          edges {
            node {
              id
              handle
              title
              description
              availableForSale
              metafield(namespace: "global", key: "Bundle-Items") {
                value
              }
              featuredImage {
                url
                height
                width
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
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
    handle,
  };
  const res = await storefront.request(query, variables);
  return res.collection || undefined;
};

export interface ShopifyProductQuery {
  products: {
    edges: {
      node: ProductInfo;
      cursor: string;
    }[];
  };
}

export const getShopifyCollectionQuery = async (
  search: string
): Promise<ShopifyProductQuery | undefined> => {
  const query = gql`
    query QueryProduct($search: String!) {
      products(first: 10, query: $search) {
        edges {
          cursor
          node {
            id
            handle
            title
            description
            availableForSale

            featuredImage {
              url
              height
              width
            }

            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
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
    search,
  };

  const res = await storefront.request(query, variables);
  return res;
};

interface ProductInside {
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    url: string;
  };
}

export interface ShopifyCompareProduct {
  product1: ProductInside;
  product2: ProductInside;
  product3: ProductInside;
}

export const getCompareProductsShopify = async (
  handle1: string,
  handle2: string,
  handle3: string
): Promise<ShopifyCompareProduct> => {
  console.log(handle1);
  const query = gql`
    query CompareProduct($handle1: String, $handle2: String, $handle3: String) {
      product1: product(handle: $handle1) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
      product2: product(handle: $handle2) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
      product3: product(handle: $handle3) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
    }
  `;
  const variables = {
    handle1,
    handle2,
    handle3,
  };
  const res = await storefront.request(query, variables);
  return res;
};
