import { GraphQLClient } from 'graphql-request';

let graphcms: GraphQLClient;

export default function getStorefront() {
  if (!graphcms) {
    graphcms = new GraphQLClient(
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT!,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        } as HeadersInit,
      }
    );
    return graphcms;
  }
  return graphcms;
}
