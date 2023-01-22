import { CardProps } from '@components/ui/bodykore/Cards/SellCardsaddon';
import {
  DynamicPages,
  getSearchItems,
  getTypesOf,
  Subcategory,
} from 'services/graphCMS';
import {
  getCollectionsHeader,
  getShopifyCollectionQuery,
  ShopifyProductQuery,
} from 'services/shopify/storefront';
import { Category, getStrapiCategories } from 'services/strapi';

export interface CategoryData {
  title: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface HeaderData {
  categories: CategoryData[];
  pages: DynamicPages;
  cartsAddon: CardProps[];
}

export const getHeader = async (): Promise<HeaderData> => {
  const res = await getCollectionsHeader();
  const strapiCategory = await getStrapiCategories();
  const cartsAddonRes = await getShopifyCollectionQuery('tag:carts');

  const headerCat = res.collections.edges;
  const headerCartAddon = cartsAddonRes!;
  // We put the packages collection first
  headerCat.sort((a, b) =>
    a.node.handle === 'packages' ? -1 : b.node.handle === 'packages' ? 1 : 0
  );
  const categories = await Promise.all(
    strapiCategory.data.map(async (item) => {
      // if (item.node && item.node.handle == 'packages') {
      //   subcategories = res.collection.products.edges.map((item) => ({
      //     name: item.node.title,
      //     slug: item.node.handle,
      //   }));
      // } else {
      //   subcategories = await getTypesOf(item.node.handle);
      // }
      return {
        title: item.attributes.title,
        slug: item.attributes.slug,
        image: item.attributes.image.data ? 'http://cms.bodykore.com'+item.attributes.image.data.attributes.url : '',
        subcategories: item.attributes.subcategories.data.map((ele)=>{
          return {
            name:ele.attributes.title,
            slug:ele.attributes.slug,
          }
        }),
      };
    })
  );

  const cartsAddon = await Promise.all(
    headerCartAddon.products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      // comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      cursor: item.cursor,
    }))
  );

  const pages = await getSearchItems();
  return { categories, pages, cartsAddon };
};
