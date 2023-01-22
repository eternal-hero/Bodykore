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

const Technology = ({ header, products, reviews }: AboutParams) => {
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
            title={'Technology'}
            description={
              ''
            }
          />




<section className="max-w-7xl m-auto lg:px-10 pb-10">
            <div id='belowBanner' className='w-full h-fit max-w-7xl m-auto pt-14'>
                <div className="text-center">
                    <div className="flex justify-center font-bebas text-5xl font-bold italic" style={{ letterSpacing: '1px' }}>
                        <h1 className="text-black-373933 pr-2">Our</h1>
                        <h1 className=" text-red-bc2026 pr-1">TECHNOLOGIES</h1>
                    </div>
                    <p className="px-5 sm:px-20 pt-8 font-roboto text-black-1c2023">
                    BodyKore’s mission is to remain at the forefront of the global fitness industry by continually providing state of the art commercial fitness equipment, innovative design, and excellent service. We focus our time and efforts on producing high quality products to help each individual achieve their fitness goals, while providing a great experience for our customers.
                    </p>
                </div>
               
            </div>
        </section>




<div className="max-w-7xl flex justify-center md:justify-start m-auto">
<div>
                <div className="flex justify-center flex-wrap">
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/szFCyIeZRxyYzhBF19lC'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/fU9uB5l6QpayHo2wBtpn'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/nWOBdI9NT2WVzskbj6vK'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/xRZWFE5OSqz7dmSkywSn'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/ch100aIkQM64MEAgVafV'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/oMYuY6xGRYC6ucnayl4g'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/2QAG8TaMRWBAyBzk4gDQ'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/HdqyJr3NRHSUB3HFH7Ov'}
                    alt=""
                  />
                  <img className={`h-56 w-56 lg:w-6/12 object-contain pb-10`}
                    src={'https://media.graphassets.com/wytpmRMWQcCco8M5t7N2'}
                    alt=""
                  />
                  <img className={`h-56 w-56 object-contain pb-10`}
                    src={'https://media.graphassets.com/8inzCn6gRa6JCiC1fYJa'}
                    alt=""
                  />
                  
                </div>
              </div>
    </div>

        </main>
      </div>
     
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Technology;
