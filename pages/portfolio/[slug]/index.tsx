import Footer from '@components/Footer';
import Header from '@components/Header';
import SeoHeader from '@components/seoHeader';
import ImageBanner from '@components/ui/bodykore/Banners/ImageBanner';
import SellCards from '@components/ui/bodykore/Cards/SellCards';
import ImgDarkEffect from '@components/ui/bodykore/ImgDarkEffect';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import DoubleText from '@components/ui/bodykore/Text/DoubleText';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { getAllProjectsSlug, getProject, Project } from 'services/graphCMS';
import { getProductCard, ProductInfo } from 'services/shopify/storefront';
import seo from '../../../public/SEO/en.json';
import { mediaUrl } from '@utils/baseUrls';
import { getStrapiProject, ProjectStrapi } from 'services/strapi/project';

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  // const project = await getProject(slug as string);
  const projectStrapi = await getStrapiProject(slug as string);

  if (projectStrapi === undefined) {
    return {
      notFound: true,
    };
  }

  const products: ProductInfo[] = [];
  for (let product of projectStrapi.attributes.products.data) {
    const res = await getProductCard(product.attributes.handle);

    if (res !== undefined) {
      products.push(res);
    }
  }
  const header = await getHeader();

  return {
    props: {  products, header, projectStrapi },
  };
};

interface SingleProjectParams {
  
  products: ProductInfo[];
  projectStrapi: ProjectStrapi;
}

const SingleProject = ({

  products,
  projectStrapi,
}: SingleProjectParams) => {
  // const related = project.related.map((item) => ({
  //   image: item.image[0]?.url,
  //   slug: item.slug,
  // }));

  const mapProducts = () => {
    return products.map((item) => ({
      id: item.variants.edges[0].node.id,
      slug: item.handle,
      bgImg: item.featuredImage?.url,
      title: item.title,
      price: item.variants.edges[0].node.priceV2.amount,
      comparePrice: item.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.description,
      available: item.availableForSale,
    }));
  };

  // dynamically change seo title
  const dinamycSeo = () => {
    return seo.portfolioProject;
  };

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />

      {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <ImageBanner
          height={'h-80'}
          bgImage={
            mediaUrl + projectStrapi.attributes.image.data[0].attributes.url
          }
        />

        <div className="px-2">
          <DoubleText
            title1={projectStrapi.attributes.title}
            title2={projectStrapi.attributes.subTitle}
            items={products.map((item) => item.title)}
            description={projectStrapi.attributes.description}
          />
        </div>

        <div className="px-8">
          <SliderProgress bgImage={projectStrapi.attributes.image.data.map((el,i)=>{
            return {
              title: el.attributes.name,
              url: mediaUrl + el.attributes.url,
              description: projectStrapi.attributes.description
            }
          })} link={''} />
        </div>

        <div className="pb-12">
          <SellCards
            title={'FIND THE EQUIPMENT'}
            gap="gap-3"
            cards={mapProducts()}
          />
        </div>
{/* 
        {related.length > 0 ? (
          <div className="px-8">
            <ImgDarkEffect
              title1={'OTHER'}
              title2={'PROJECTS'}
              title3={'EQUIPMENT'}
              images={related}
              buttonsText={{
                text: 'SEE ALL',
                color: 'transparent',
              }}
            />
          </div>
        ) : null} */}
      </main>
      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default SingleProject;
