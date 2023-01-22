import SeoHeader from '@components/seoHeader';
import BlackNavOptions from '@components/ui/bodykore/NavOptions/BlackNavOptions';
import { OptionProps } from '@components/ui/bodykore/NavOptions/SwitchPagesOptions';
import Threekeys from '@components/ui/bodykore/Sections/Threekeys';
import Video from '@components/ui/bodykore/Sections/video';
import SingleProduct from '@components/ui/bodykore/Sections/Product';
import ReviewForm from '@components/ui/bodykore/Sections/ReviewForm';
import Reviews from '@components/ui/bodykore/Sections/Reviews';
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import routes from '@config/routes';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useRef } from 'react';
import {
  getProduct,
  getProductRecommendations,
  getShopifyCollectionQuery,
  Product,
  ProductInfo,
} from 'services/shopify/storefront';
import { getReviewsOfProduct, Review } from 'services/stamped';
import { getSingleProduct, ProductProps, Richtext } from 'services/graphCMS';
import ImgGallery from '@components/ui/bodykore/Sections/gallery';
import ImgDescriptionSinglePage from '@components/ui/bodykore/Sections/ImgDescriptionSinglePage';
import Featurestitle from '@components/ui/bodykore/Text/Titles/featurestitle';
import Link from 'next/link';
import SellCardsSingle, {
  CardProps,
} from '@components/ui/bodykore/Cards/SellCardsSingle';
import { getStrapiProduct, ProductStrapi } from 'services/strapi';
import Image from 'next/image';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import styled from 'styled-components';
import CompareButton from '@components/ui/bodykore/Sections/CompareButton';
import ThreeD from '@components/ui/ThreeD';
import { Gltf } from '@components/ui/GLTF';

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const productStrapi = await getStrapiProduct(slug as string);

  if (!productStrapi) {
    return {
      notFound: true,
    };
  }

  const product = await getProduct(slug as string);

  if (product === undefined) {
    return {
      notFound: true,
    };
  }

  const header = await getHeader();

  const productIdDecoded = Buffer.from(product.id, 'base64').toString();

  const productId = productIdDecoded.slice(
    productIdDecoded.lastIndexOf('/') + 1
  );
  const reviews = await getReviewsOfProduct(productId);
  const recommendations = await getProductRecommendations(product.id);
  const singleProduct = await getSingleProduct(slug as string);
  const bestSeller = await getShopifyCollectionQuery('tag:carts');
  const subNavigation = [] as unknown as SubNavProp;

  return {
    props: {
      product,
      productStrapi,
      reviews,
      recommendations,
      header,
      productId,
      singleProduct,
      subNavigation,
      bestSeller,
    },
  };
};
interface SubNavProp {
  icon: string;
  text: string;
  id: string;
}
export interface ProductPageParams {
  product: Product;
  reviews: Review[] | undefined;
  recommendations: ProductInfo[];
  productId: string;
  singleProduct: ProductProps;
  subNavigation: SubNavProp[];
  productStrapi: ProductStrapi;
}

const ProductPage = ({
  product,
  reviews,
  recommendations,
  productId,
  subNavigation,
  productStrapi,
}: ProductPageParams) => {
  const mapVideo = () => {
    return productStrapi.attributes.videos.data.map((item) => ({
      url: item.attributes.videoUrl,
      title: item.attributes.title,
    }));
  };

  const mapImages = () => {
    return product.images.edges.map((item) => ({
      url: item.node.url,
      btn3d: true,
    }));
  };

  const getRating = () => {
    if (reviews === undefined || reviews.length === 0) {
      return 0;
    }
    let sum = 0;
    for (let review of reviews) {
      sum += review.reviewRating;
    }
    return sum / reviews.length;
  };

  const mapOptions = () => {
    return product.variants.edges.map((item) => ({
      title: item.node.title,
      id: item.node.id,
      price: item.node.priceV2.amount,
      prevPrice: item.node.compareAtPriceV2?.amount,
      img: item.node.image?.url,
      available: item.node.availableForSale,
    }));
  };

  const mapReviews = () => {
    return (reviews || []).map((item, index) => ({
      id: item.id,
      name: item.author,
      rating: item.reviewRating,
      title: item.reviewTitle,
      date: item.reviewDate,
      description: item.reviewMessage,
      numLikes: item.reviewVotesUp,
      numDislikes: item.reviewVotesDown,
    }));
  };

  const scrollDown = () => {
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  //for recommended products
  const mapProducts = (): CardProps[] => {
    return recommendations.slice(0, 5).map((item) => ({
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

  //for feature section
  const mapFeatures = () => {
    return productStrapi.attributes.feature.map((ele) => ({
      title: ele.title,
      subFeatures: ele.subFeature.map((el) => ({
        img:
          el.images.data[0].attributes != undefined
            ? mediaUrl + el.images.data[0].attributes.url
            : imageNotFound,
        description:
          el.description != undefined && el.description != null
            ? el.description
            : '',
        title: el.title != undefined ? el.title : '',
      })),
    }));
  };

  //for gallery images
  const mapGallery = () => {
    return productStrapi.attributes.gallery.data.map((item) => ({
      img: mediaUrl + item.attributes.url,
      btn3d: true,
    }));
  };

  // dynamically change seo title
  const dinamycSeo = () => {
    return {
      title: product.title,
      description:
        productStrapi.attributes.description != undefined
          ? productStrapi.attributes.description
          : '',
      noIndex: true,
      nofollow: true,
      image: {
        url: '',
      },
    };
  };

  //technologies map
  const mapTechnologies = () => {
    return productStrapi.attributes.technologies.data.map((ele) => ({
      title: ele.attributes.title,
      description: ele.attributes.description,
      image:ele.attributes.image.data.attributes ? mediaUrl + ele.attributes.image.data.attributes.url : imageNotFound,
      iconImage: mediaUrl + ele.attributes.iconImage.data.attributes.url,
    }));
  };

  const mapSubNavigation = () => {
    if (productStrapi.attributes.description != undefined) {
      subNavigation = [
        {
          icon: '/svg/paper.svg',
          text: 'Description',
          id: 'description',
        },
      ];
    }
    if (productStrapi.attributes.gallery.data.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/highlight.svg',
          text: 'Gallery',
          id: 'gallery',
        },
      ];
    }
    if (productStrapi.attributes.feature.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/key.svg',
          text: 'Features',
          id: 'features',
        },
      ];
    }
    if (productStrapi.attributes.videos.data.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/video.svg',
          text: 'Videos',
          id: 'videos',
        },
      ];
    }
    if (productStrapi.attributes.specification != undefined) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/specification.svg',
          text: 'Specifications',
          id: 'specifications',
        },
      ];
    }
    if (reviews != undefined && reviews.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/reviewStar.svg',
          text: 'Reviews',
          id: 'reviews',
        },
      ];
    }
    return subNavigation;
  };

  const validateToShow = (data: string) => {
    return data && data.length > 0;
  };

  const [threekeys, setThreekeys] = React.useState([
    {
      icon: '/Product/location.svg',
      title: 'Home Delivery',
      description: 'Available Nationwide',
    },
    {
      icon: '/Product/freereturn.svg',
      title: 'Free Returns',
      description: 'Within 14 Days',
    },
    {
      icon: '/Product/assembly.svg',
      title: 'Easy Assembly',
      description: 'Professional Not Required',
    },
    {
      icon: '/Product/warranty.svg',
      title: 'Warranty Policy',
      description: 'Life Time',
    },
    {
      icon: '/Product/return.svg',
      title: 'Return Policy',
      description: '30-Day easy return',
    },
  ]);
  const switchPage: OptionProps[] = [
    {
      icon: '/svg/home.svg',
      text: 'Products',
      arrow: '/svg/rightArrow.svg',
      link: routes.products.path,
    },
  ];
  if (product.collections.edges.length !== 0) {
    switchPage.push({
      text: product.collections.edges[0].node.title,
      arrow: '/svg/rightArrow.svg',
      link: `${routes.collection.path}/${product.collections.edges[0].node.handle}`,
    });
  }
  switchPage.push({
    text: product.title,
  });

  return (
    <>
      {}
      <SeoHeader seo={dinamycSeo()} />

      <section className="w-full overflow-x-hidden">
        <div className="max-w-7xl m-auto px-6 flex flex-row pt-5 pb-2">
          <div className="w-5/6">
            <div className="">
              <Link
                href={`${routes.products.path}?category=${switchPage[1].text}`}
              >
                <a>
                  {switchPage[1].text &&
                  switchPage[1].text.split(',').length != 1
                    ? switchPage[1].text.split(',')[1]
                    : switchPage[1].text}
                </a>
              </Link>
              {switchPage[1].text !== product.productType && (
                <Link
                  href={`${routes.products.path}?category=${switchPage[1].text}`}
                >
                  <a> {product.productType}</a>
                </Link>
              )}
            </div>
            <div className="">
              <Blacktitle
                title={product.title}
                textSize="text-4xl"
                textColor="text-black-373933"
              />
            </div>
          </div>
          <div className="w-1/6 m-auto justify-end  flex-wrap hidden">
            <CompareButton
              product={{
                title: product.title,
                image: product.images.edges[0].node.url,
                id: productStrapi.attributes.handle,
                price: product.variants.edges[0].node.priceV2.amount,
              }}
            />
          </div>
        </div>
      </section>
      <section className="w-full overflow-x-hidden">
        {/*PRODUCT SECTION*/}
        <div className="flex lg:flex-row flex-wrap justify-center md:justify-center max-w-7xl m-auto px-6 pt-2">
          <div className="md:w-1/2 w-96 pr-8">
            <ImgPagSlider bgImage={mapImages()} />
          </div>

          <div className="md:w-1/2 w-96">
            <SingleProduct
              affirmMonthly="$60/mo"
              affirmTax="at 0%"
              affirmLogo="/Product/affirm.jpg"
              rating={getRating()}
              technologies={mapTechnologies()}
              product={{
                title: product.title,
                image: product.images.edges[0].node.url,
                id: productStrapi.attributes.handle,
                price: product.variants.edges[0].node.priceV2.amount,
              }}
              numReviews={reviews?.length || 0}
              description={productStrapi.attributes.description}
              options={mapOptions()}
              reviewOnClick={scrollDown}
            />
          </div>
        </div>

        {/*3 opts below product OPTIONS SECTION*/}
        <div className="w-full border-t border-b mt-5 sm:mt-0 py-10">
          <div className="flex-row lg:flex-row flex-wrap max-w-7xl justify-center md:justify-center m-auto">
            <Threekeys textSize="text-xs" threekeys={threekeys} factors={[]} />
          </div>
        </div>

        {/*NAV OPTIONS SECTION*/}
        <div className="hidden sm:block w-full bg-black py-10">
          <div className="flex-row lg:flex-row flex-wrap max-w-7xl justify-center md:justify-center m-auto">
            <BlackNavOptions height="h-fit" options={mapSubNavigation()} />
          </div>
        </div>

        {/*DESCRIPTION SECTION*/}

        <section className="py-20 max-w-7xl m-auto" id="description">
          <div className="flex lg:flex-row flex-wrap justify-center md:justify-start max-w-7xl m-auto px-6">
            <div className="md:w-2/3 pr-0 sm:pr-16 pb-10">
              <Blacktitle
                title="DESCRIPTION"
                textSize="text-4xl"
                textColor="text-black-373933"
              />
              {productStrapi.attributes.description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: productStrapi.attributes.description,
                  }}
                ></div>
              )}
            </div>
            {productStrapi.attributes.descriptionImage && (
              <div className="md:w-1/3">
                <Image
                  src={
                    mediaUrl +
                    productStrapi.attributes.descriptionImage.data.attributes
                      .url
                  }
                  alt={productStrapi.attributes.handle}
                  key={productStrapi.attributes.handle}
                  height={300}
                  width={400}
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </section>

        {/*HIGHLIGHTS/features SECTION*/}

        <div className="w-full py-20 bg-gray-200" id="features">
          {productStrapi.attributes.feature && (
            <div className="w-full px-10">
              <div className="max-w-7xl flex justify-center md:justify-center m-auto">
                <ImgDescriptionSinglePage
                  imgHeight="w-full"
                  imgWidth="w-full"
                  textSize="text-sm"
                  images={mapFeatures()}
                />
              </div>
            </div>
          )}
        </div>

        {/*Images SECTION*/}

        {productStrapi.attributes.file3d.data != null && (
          <ThreeDComponent>
            <Gltf image={productStrapi.attributes.file3d.data.attributes.url}/>
          </ThreeDComponent>
        )}

        {mapGallery().length > 0 && (
          <section className="bg-grey-200" id="gallery">
            <div className="w-full py-20">
              <div className="flex justify-center md:justify-start m-auto">
                <Blacktitle
                  title="Gallery"
                  textSize="text-4xl"
                  textColor="text-black-373933"
                />
              </div>
              <div className="max-w-7xl flex justify-center md:justify-start m-auto">
                <ImgGallery
                  imgHeight="h-auto"
                  imgWidth="w-auto"
                  images={mapGallery()}
                />
              </div>
            </div>
          </section>
        )}

        {/* <Canvas camera={{ position: [0, 0, 300] }}>
          <Lights />
          <Model />
        </Canvas> */}

        {/*video SECTION*/}

        {mapVideo().length > 0 && (
          <div className="w-full bg-gray-200 py-28">
            <div
              className="text-black-373933 text-4xl font-bebas font-bold italic text-left md:text-left pb-5"
              id="videos"
            >
              <Featurestitle
                title="Videos"
                textSize="text-4xl"
                textColor="text-black-373933"
              />
            </div>
            <div className="max-w-7xl flex justify-center md:justify-center m-auto">
              <Video videos={mapVideo()} />
            </div>
          </div>
        )}
        {/*SPECS SECTION*/}
        {productStrapi.attributes.specification != undefined && (
          <div className="py-20" id="specifications">
            <div className="flex justify-center md:justify-start m-auto ">
              <Blacktitle
                title="SPECIFICATIONS"
                textSize="text-4xl"
                textColor="text-black-373933"
              />
            </div>

            <section className="w-full">
              <div className="max-w-7xl m-auto px-6 pt-5 pb-2">
                <div className="m-auto w-full flex justify-center">
                  {productStrapi.attributes.specification.image.data && (
                    <Image
                      src={
                        mediaUrl +
                        productStrapi.attributes.specification.image.data
                          .attributes.url
                      }
                      alt={`specification`}
                      height={400}
                      width={400}
                      objectFit="contain"
                    />
                  )}
                </div>
                <div className="flex flex-row gap-5 m-auto justify-center pt-5">
                  <div className="bg-gray-300 px-5 py-5 w-1/3">
                    <ListSepecification className="">
                      {validateToShow(
                        productStrapi.attributes.specification.dimensions
                      ) && (
                        <li>
                          <span> Dimensions</span>
                          {productStrapi.attributes.specification.dimensions}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.weight
                      ) && (
                        <li>
                          <span> Weight</span>
                          {productStrapi.attributes.specification.weight}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.footprint
                      ) && (
                        <li>
                          <span> Footprint</span>
                          {productStrapi.attributes.specification.footprint}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.frame
                      ) && (
                        <li>
                          <span>Frame</span>
                          {productStrapi.attributes.specification.frame}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.frameColor
                      ) && (
                        <li>
                          <span>Frame Color</span>
                          {productStrapi.attributes.specification.frameColor}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.weightStack
                      ) && (
                        <li>
                          <span>Weight Stack</span>
                          {productStrapi.attributes.specification.weightStack}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification
                          .ofAdjustableHeightPositions
                      ) && (
                        <li>
                          <span># of Adjustable Height Positions</span>
                          {
                            productStrapi.attributes.specification
                              .ofAdjustableHeightPositions
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.ofWeightPegs
                      ) && (
                        <li>
                          <span># Of Weight Pegs</span>
                          {productStrapi.attributes.specification.ofWeightPegs}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification
                          .counterBalancedSmithMachine
                      ) && (
                        <li>
                          <span>Counter Balanced Smith Machine</span>
                          {
                            productStrapi.attributes.specification
                              .counterBalancedSmithMachine
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.halfRackFunction
                      ) && (
                        <li>
                          <span>Half Rack Function</span>
                          {
                            productStrapi.attributes.specification
                              .halfRackFunction
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.dualPulleySystem
                      ) && (
                        <li>
                          <span>Dual Pulley System</span>
                          {
                            productStrapi.attributes.specification
                              .dualPulleySystem
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.accessoryStorage
                      ) && (
                        <li>
                          <span>Accessory Storage</span>
                          {
                            productStrapi.attributes.specification
                              .accessoryStorage
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.dimensions
                      ) && (
                        <li>
                          <span>Multi Grip Pull Up Handles</span>
                          {
                            productStrapi.attributes.specification
                              .multiGripPullUpHandles
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.barStorage
                      ) && (
                        <li>
                          <span>Bar Storage</span>
                          {productStrapi.attributes.specification.barStorage}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.bodyGroupTarget
                      ) && (
                        <li>
                          <span>Body Group Target</span>
                          {
                            productStrapi.attributes.specification
                              .bodyGroupTarget
                          }
                        </li>
                      )}

                      {validateToShow(
                        productStrapi.attributes.specification.ofWorkouts
                      ) && (
                        <li>
                          <span># of Workouts</span>
                          {productStrapi.attributes.specification.ofWorkouts}
                        </li>
                      )}

                      {validateToShow(
                        productStrapi.attributes.specification.assemblyTime
                      ) && (
                        <li>
                          <span>Assembly Time</span>
                          {productStrapi.attributes.specification.assemblyTime}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification
                          .ofAdjustableBackPositions
                      ) && (
                        <li>
                          <span># of Adjustable Back Positions</span>
                          {
                            productStrapi.attributes.specification
                              .ofAdjustableBackPositions
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification
                          .ofFoamRollerAdjustments
                      ) && (
                        <li>
                          <span># of Foam Roller Adjustments</span>
                          {
                            productStrapi.attributes.specification
                              .ofFoamRollerAdjustments
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.cushionMaterial
                      ) && (
                        <li>
                          <span>Cushion Material</span>
                          {
                            productStrapi.attributes.specification
                              .cushionMaterial
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.cushionDimensions
                      ) && (
                        <li>
                          <span>Cushion Dimensions</span>
                          {
                            productStrapi.attributes.specification
                              .cushionDimensions
                          }
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.angles
                      ) && (
                        <li>
                          <span>Angles</span>
                          {productStrapi.attributes.specification.angles}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.wheels
                      ) && (
                        <li>
                          <span>Wheels</span>
                          {productStrapi.attributes.specification.wheels}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.footrest
                      ) && (
                        <li>
                          <span>Foot Rest</span>
                          {productStrapi.attributes.specification.footrest}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification.handle
                      ) && (
                        <li>
                          <span>Handle</span>
                          {productStrapi.attributes.specification.handle}
                        </li>
                      )}
                      {validateToShow(
                        productStrapi.attributes.specification
                          .ofAdjustableSeatPositions
                      ) && (
                        <li>
                          <span># of Adjustable Seat Positions</span>
                          {
                            productStrapi.attributes.specification
                              .ofAdjustableSeatPositions
                          }
                        </li>
                      )}
                    </ListSepecification>
                  </div>
                  {productStrapi.attributes.accessoriesIncluded &&
                    productStrapi.attributes.accessoriesIncluded.length >
                      10 && (
                      <div className="bg-gray-300">
                        <h3 className="font-bold bg-gray-600 text-white w-full px-5 py-2">
                          Accessories Included
                        </h3>
                        <div
                          className="px-5 py-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              productStrapi.attributes.accessoriesIncluded,
                          }}
                        ></div>
                      </div>
                    )}
                  {productStrapi.attributes.attachmentsIncluded &&
                    productStrapi.attributes.attachmentsIncluded.length >
                      10 && (
                      <div className="bg-gray-300">
                        <h3 className="font-bold bg-gray-600 text-white w-full px-5 py-2">
                          Attachment Included
                        </h3>
                        <div
                          className="px-5 py-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              productStrapi.attributes.attachmentsIncluded,
                          }}
                        ></div>
                      </div>
                    )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/*REVIEW SECTION*/}
        {mapReviews().length > 0 && (
          <div className="pb-4 max-w-7xl m-auto px-8 id='reviews'">
            <Blacktitle
              title={`REVIEWS (${reviews?.length || 0})`}
              textSize="text-4xl"
              textColor="text-black-373933"
            />
          </div>
        )}
        {mapReviews().length > 0 && (
          <div>
            <Reviews reviews={mapReviews()} />
          </div>
        )}

        <div className="pt-20">
          <ReviewForm productId={productId} />
        </div>

        {/*SELLS CARDS SECTION*/}
        <div className="py-12">
          {recommendations.length > 0 ? (
            <div className="max-w-7xl m-auto">
              <Featurestitle
                title="SIMILAR PRODUCT"
                textSize="text-4xl"
                textColor="text-black-373933"
              />
              <SellCardsSingle gap="gap-5" cards={mapProducts()} />
            </div>
          ) : null}
        </div>
      </section>
      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default ProductPage;
function addToCompare(product: Product): void {
  throw new Error('Function not implemented.');
}

const ListSepecification = styled.ul`
  display: flex;
  flex-flow: column;
  li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    text-transform: capitalize;
    border-bottom: 1px solid #fff;
    padding-bottom: 5px;
    margin-bottom: 5px;
    span {
      margin-right: 25px;
      font-weight: 600;
    }
  }
`;


const ThreeDComponent = styled.div`
display: flex;
justify-content: center;
margin-top: 100px;
width: 100%;
`