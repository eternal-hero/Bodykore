import Footer from '@components/Footer';
import Header from '@components/Header';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import CatPackagesSection1 from '@components/ui/bodykore/Sections/CatPackagesSection1';
import CatPackagesSection2 from '@components/ui/bodykore/Sections/CatPackagesSection2';
import SliderPackages from '@components/ui/bodykore/Sliders/SliderPackages';
import CatPackagesSection3 from '@components/ui/bodykore/Sections/CatPackagesSection3';
import CatPackagesSection4 from '@components/ui/bodykore/Sections/CatPackagesSection4';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import useWindowSize from '@lib/hooks/use-window-size';
import routes from '@config/routes';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import React from 'react';
import { CMSCollectionPage, getCMSCollectionPage } from 'services/graphCMS';
import {
  getProductCard,
  getShopifyCollectionPage,
  ShopifyCollectionPage,
} from 'services/shopify/storefront';
import seo from "../../public/SEO/en.json";
import { NextSeo } from 'next-seo'
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const shopifyData = await getShopifyCollectionPage('packages');
  const CMSData = await getCMSCollectionPage('packages');
  const bundleItems: string[][] = [];
  for (let product of shopifyData!.products.edges) {
    const productItems: string[] = [];
    if (product.node.metafield) {
      for (let item of product.node.metafield.value.split(',')) {
        const res = await getProductCard(item);
        console.log(res)
        // productItems.push(res.title);
      }
    }
    bundleItems.push(productItems);
  }

  return {
    props: { header, shopifyData, CMSData, bundleItems },

  };
};

interface AllBenchesParams {
  header: HeaderData;
  shopifyData: ShopifyCollectionPage;
  CMSData: CMSCollectionPage;
  bundleItems: string[][];
}

const AllBenches = ({
  header,
  shopifyData,
  CMSData,
  bundleItems,
}: AllBenchesParams) => {
  const mapProjects = () => {
    return CMSData.projectCategories.map((item) => ({
      url: "item.projects[0].image[0].url",
      title: item.title,
      link: "${routes.portfolio.path}/${item.projects[0].slug}",
    }));
  };

  const mapProducts = () => {
    return shopifyData.products.edges.map((item, index) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      url: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      // comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      // description: item.node.description,
      available: item.node.availableForSale,
      affirmPrice: '$60/mo at',
      affirmIcon: '/Product/affirm.jpg',
      options: bundleItems[index],
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;

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
          title={'PACKAGES'}
          description="Bodykore’s home gym packages are designed to fit in any home. Whether there are space constraints or if you’re looking to turn your whole garage into a gym, we have a package that fits."
          bgImage={CMSData.category?.cover?.url}
        />

        <div className="py-32" id="belowBanner">
          <CatPackagesSection1
            title1="THE BEST FITNESS EQUIPMENT IN EVERY"
            title2="BODYKORE PACKAGE"
            paragraphs={[
              {
                text:'At BodyKore, we have the best complete fitness equipment, either if you are looking for commercial gym equipment or fitness equipment to build your gym at home. In our catalog, you will find a wide range of packages containing several products to start or upgrade your commercial studio or private fitness room, including some of our world-class machines and other accessories like benches or weights.'
              },
              {
                text:'The fitness equipment included in all our packages provides all necessary items for training your body to the maximum level and going that extra mile, from functional training to bodybuilding, from compound workouts to isolation exercises, from starter to professional level. There’s a package for everyone, and all of them are of the highest quality.'
              }
            ]}
            img="/Packages-category/Section1.png"
          />
        </div>

        <div>
            {
              (() => {
                if( widthSize !== undefined && widthSize >= 800) {
                  return (
                    <div className="pt-10 pb-28">
                      <CatPackagesSection2
                        title1="OUR"
                        color1="text-black-373933"
                        title2="PACKAGES"
                        color2="text-red-bc2026"
                        btnText="SEE ALL PACKAGES"
                        border="border"
                        btnBorder="border-black-373933"
                        link={`${routes.products.path}?category=Packages`}
                        cards={mapProducts()}
                      />
                    </div>

                  )
                }else {
                  return (
                    <div className="pt-10 pb-28">
                        <SliderPackages 
                          title1="OUR"
                          color1="text-black-373933"
                          title2="PACKAGES"
                          color2="text-red-bc2026"
                          btnText="SEE ALL PACKAGES"
                          border="border"
                          btnBorder="border-black-373933"
                          link={`${routes.products.path}?category=Packages`}
                          cards={mapProducts()}
                        />
                    </div>
                  )
                }
              })()  
            } 
          </div>

        <CatPackagesSection3
          title={'VIDEO SECTION'}
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore."
          bgImage={'/Packages-category/VideoSection.png'}
          btnText="SEE MORE"
          slug="videos"
        />

        <CatPackagesSection4
          title1={'WHY CHOOSE'}
          title2="US"
          paragraphs={[
            {
              text:'The fitness equipment included in every package has been carefully selected to fulfill the needs of each profile of fitness enthusiast, depending on the type of training you like, the space you have available, or if you are looking for commercial gym equipment or equipment for private use, for which we have prepared six different packages: Dynamic Package, Universal Gym Package, Home Gym Package, Garage Gym Package, Weight Room Package, and Free Weight Package. Visit our online shop and find your own!'
            },
            {
              text:'BodyKore is a solid brand in the fitness and wellness industry, delivering only products of superior quality. Our fitness equipment is among the best in the market, and helping our customers reach their fitness goals is our main motivation.'
            },
            {
              text:'At Bodykore, we are specialists in all kinds of fitness equipment. Our team is made up of professionals who are passionate about the same things you are: fitness, wellness, and empowerment through physical activity.'
            },
            {
              text:'If you have any questions or need further advice on which fitness equipment to purchase, you can contact us via telephone, e-mail, or live chat. We are looking forward to hearing from you.'
            }
          ]}
          bgImage="/Packages-category/Section2.png"
          heightbg="768px"
          heightGradient="768px"
        />

        <div className="py-28 px-8">
          <SliderProgress
            title1={'GET'}
            title2={'INSPIRATION'}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            btnText="PORTFOLIO"
            link={routes.portfolio.path}
            bgImage={mapProjects()}
            width='w-1/2'
          />
        </div>
      </section>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default AllBenches;
