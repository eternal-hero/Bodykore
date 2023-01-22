import { GraphQLClient } from 'graphql-request';

let graphcms: GraphQLClient;

export default function getStrapicms() {
  if (!graphcms) {
    graphcms = new GraphQLClient(process.env.STRAPICMS_ENDPOINT!, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPICMS_ACCESS_TOKEN!}`,
      },
    });
    return graphcms;
  }
  return graphcms;
}
