import Footer from '@components/Footer';
import Header from '@components/Header';
import InvisibleBanner from '@components/ui/bodykore/Banners/InvisibleBanner';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import SellCards from '@components/ui/bodykore/Cards/SellCards';
import OurVision from '@components/ui/bodykore/Sections/AboutSection1';
import WeAreBK from '@components/ui/bodykore/Sections/AboutSection2';
import WhatWeDo from '@components/ui/bodykore/Sections/AboutSection3';
import OneReview from '@components/ui/bodykore/Sections/AboutSection4';
import { NUM_TOP_PRODUCTS } from '@config/siteConfig';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';
import seo from "../public/SEO/en.json";
import {
  getAllProducts,
  GetAllProductsResponse,
  Sort,
} from 'services/shopify/storefront';
import { getHomeReviews, Review } from 'services/stamped';
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const products = await getAllProducts(
    NUM_TOP_PRODUCTS,
    undefined,
    undefined,
    Sort.BestSelling
  );
  const reviews = await getHomeReviews();

  return {
    props: { header, products, reviews },
   // revalidate: 30 * 60,
  };
};

interface AboutParams {
  header: HeaderData;
  products: GetAllProductsResponse;
  reviews: Review[];
}

const About = ({ header, products, reviews }: AboutParams) => {
  const mapProducts = () => {
    return products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      cursor: item.cursor,
    }));
  };

  return (
    <>
      <SeoHeader seo={seo.aboutUs} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <div>
        <main className="w-full">
          <MainBanner
            bgImage={'/AboutUs/coverImage.jpg'}
            title={'ABOUT US'}
            description={
              ''
            }
          />

          <OurVision
            title1="OUR"
            title2="VISION"
            // id="belowBanner"
            description="BodyKore’s mission is to remain at the forefront of the global fitness industry by continually providing state of the art commercial fitness equipment, innovative design, and excellent service. We focus our time and efforts on producing high quality products to help each individual achieve their fitness goals, while providing a great experience for our customers."
            options={[
              {
                icon: '/svg/advance.svg',
                title: 'ADVANCE',
                width: '50px',
                height: '50px',
              },
              {
                icon: '/svg/innovation.svg',
                title: 'INNOVATION',
                width: '50px',
                height: '50px',
              },
              {
                icon: '/svg/progress.svg',
                title: 'PROGRESS',
                width: '76.5px',
                height: '25px',
              },
            ]}
          />

          <WeAreBK
            title1="WE ARE"
            title2="#BODYKORE"
            description1="BodyKore is a leading innovator in creating prestige commercial fitness equipment worldwide. Founded in Los Angeles, California, in 2005, BodyKore has grown into a full service fitness provider, which now has locations in three countries around the world."
            description2="The BodyKore team includes individuals who live for fitness and promote a healthy lifestyle. Our team is made up of product specialists, engineers, Kinesiologists, designers, and hands on specialists who all have a mutual passion for fitness. Our industry expertise and desire, drives our success."
            btnText="JOIN OUR TEAM"
            img="/AboutUs/weAre.jpg"
          />

          <WhatWeDo
            img="/AboutUs/whatWeDo.jpg"
            title1="WHAT WE"
            title2="DO"
            description1="Through our team of experts and prestige production capabilities, we are able to produce equipment at the highest bio-mechanical caliber. Customer value comes first and it is displayed through our one on one interaction and compelling problem solving. We do not limit our mission by solely delivering high quality equipment and great customer experience."
            description2="We have taken it upon ourselves to go one step further by directly engaging with our users through our online community and social network. Through these avenues we are able to interact with our users on a daily basis, share product knowledge, and get a better understanding of the industries wants and needs. We make sure to provide our customers with the best fitness experience by combining our knowledge for the industry, with hard work and love for fitness."
          />

          {reviews.length !== 0 ? (
            <div className="py-10 px-8 bg-black-1c2023">
              <OneReview img="/frontPage/Review.jpg" reviews={reviews} />
            </div>
          ) : null}

          <div className="py-14">
            <SellCards title={'TOP SELLS'} gap="gap-3" cards={mapProducts()} />
          </div>


        </main>
      </div>
     
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default About;
