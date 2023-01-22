import { GraphQLClient } from 'graphql-request';

let graphcms: GraphQLClient;

export default function getAdmin() {
  if (!graphcms) {
    graphcms = new GraphQLClient(process.env.SHOPIFY_ADMIN_ENDPOINT!, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      } as HeadersInit,
    });
    return graphcms;
  }
  return graphcms;
}
