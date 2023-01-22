import Footer from '@components/Footer';
import Header from '@components/Header';
import SeoHeader from '@components/seoHeader';
import FadingAndInfo from '@components/ui/bodykore/Banners/FadingAndInfo';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import SellCards from '@components/ui/bodykore/Cards/SellCards';
import ImgDescription from '@components/ui/bodykore/Sections/ImgDescription';
import Slider from '@components/ui/bodykore/Sliders/Slider';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import TextRImg from '@components/ui/bodykore/Text/TextRImg';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import routes from '@config/routes';
import useWindowSize from '@lib/hooks/use-window-size';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import {
  CMSCollectionPage,
  getAllCategoriesSlug,
  getCMSCollectionPage,
  getProjectsOfCategoryHome,
  ProjectCategoryHome,
  ProjectInfo,
  Richtext,
} from 'services/graphCMS';
import {
  getShopifyCollectionPage,
  ShopifyCollectionPage,
} from 'services/shopify/storefront';
import seo from "../../../public/SEO/en.json";

// export const getStaticPaths = async () => {
//   const projects = await getAllCategoriesSlug();

//   const paths = projects
//     .filter(({ slug }) => slug != 'packages')
//     .map(({ slug }) => ({ params: { slug } }))
//     .flat();

//   return {
//     paths: [...paths],
//     fallback: 'blocking',
//   };
// };

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const shopifyData = await getShopifyCollectionPage(slug as string);
  const CMSData = await getCMSCollectionPage(slug as string);
  const projects = await getProjectsOfCategoryHome();

  if (shopifyData === undefined || CMSData.category === undefined) {
    return {
      notFound: true,
    };
  }

  const header = await getHeader();

  return {
    props: { shopifyData, header, CMSData,projects },
  };
};

interface CategoryParams {
  shopifyData: ShopifyCollectionPage;
  CMSData: CMSCollectionPage;
  header: HeaderData;
  projects:ProjectCategoryHome[];
}

const Category = ({ shopifyData, header, CMSData,projects }: CategoryParams) => {
  const mapSubcategories = () => {
    return CMSData.category!.subcategories.map((item) => ({
      url: item.image?.url,
      topTitle: item.name,
      title: item.name,
      link: `${routes.products.path}?category=${shopifyData.title}`,
      subCategories:[]
    }));
  };

  const mapProjects = () => {
    return projects.map((item) => ({
      url:
        item.projects.length > 0
          ? item.projects[0].image[0].url
          : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png',
      title: item.title,
      link:
        item.projects.length > 0
          ? `${routes.portfolio.path}/${item.projects[0].slug}`
          : '',
    }));
  }

  const mapProducts = () => {
    return shopifyData.products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
    }));
  };

  const mapFeatures = () => {
    return CMSData.category!.features.map((item) => ({
      img: item.image[0].url,
      description: item.description,
      title:item.title
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;
  // dynamically change seo title
  const dinamycSeo = () => {
    return {
      title: shopifyData.title,
      description: "string",
      noIndex: true,
      nofollow: true,
      image: {
        url: ""
      }
    };
  }
  return (
    <>
      <SeoHeader seo={dinamycSeo()} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
       <section className="w-full">
        <MainBanner
          title={shopifyData.title}
          description={shopifyData.description}
          bgImage={CMSData.category?.cover?.url}
        />
 
        <div className="pt-5" id="belowBanner">
          <TextRImg
            title="DISCOVERING"
            description="Bodykore’s home gym packages are designed to fit in any home. Whether there are space constraints or if you’re looking to turn your whole garage into a gym, we have a package that fits."
            img={CMSData.category?.discover?.url}
          />
        </div>

        <div>
          {(() => {
            if (widthSize !== undefined && widthSize >= 800) {
              return (
                <div className="py-12 px-8">
                  <Slider
                    title1="ALL"
                    color1="text-red-bc2026"
                    title2={shopifyData.title}
                    color2="text-black-373933"
                    btnText={`SEE ALL ${shopifyData.title}`}
                    btnBorder="border-black-373933"
                    border="border-2"
                    bgImage={mapSubcategories()}
                    link={`${routes.products.path}?category=${shopifyData.title}`}
                  />
                </div>
              );
            } else {
              return (
                <div className="py-12 px-8">
                  <SliderProgress
                    title1={'ALL'}
                    title2={shopifyData.title}
                    color1={'text-red-bc2026'}
                    color2={'text-black-373933'}
                    btnText={`SEE ALL ${shopifyData.title}`}
                    link={`${routes.products.path}?category=${shopifyData.title}`}
                    bgImage={mapSubcategories()}
                    gap="gap-20"
                    pb="py-4"
                  />
                </div>
              );
            }
          })()}
        </div>

        {/* <div className="px-8">
          <Blacktitle
            title="FEATURES"
            textColor="text-black-373933"
            textSize="text-5xl"
          />
        </div> */}
{/* 
        <div className="pt-10">
          <ImgDescription
            imgHeight="h-72"
            imgWidth="w-72"
            textSize="text-sm"
            images={mapFeatures()}
          />
        </div> */}

        <div className="pt-52">
          <FadingAndInfo
            title={'HOW TO...'}
            description="BodyKore’s large array of benches comes in various designs that includes fixed and adjustable positions. Any BodyKore bench is a good addition to make as a focal point for your strength training, ensuring you can reap the full benefits of reps and sets."
            icon="/svg/document.svg"
            btnText="Download Technical Data"
            bgImage={'bg-mid-banner'}
            heightbg="498px"
            heightGradient="498px"
            link={routes.manuals.path}
          />
        </div>

        <div className="py-44 px-8">
          <SliderProgress
            title1={'GET'}
            title2={'INSPIRATION'}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            btnText="PORTFOLIO"
            link={routes.portfolio.path}
            bgImage={mapProjects()}
            width="w-1/2"
          />
        </div>

        <div className="pb-64">
          <Blacktitle
            title={`TOP ${shopifyData.title} SELLS`}
            textColor="text-black-373933"
            textSize="text-5xl"
          />
          <SellCards gap="gap-12" cards={mapProducts()} />
        </div>
      </section>
    {/* <Footer productCat={header.categories} />*/} 
 
    </>
  );
};

export default Category;
