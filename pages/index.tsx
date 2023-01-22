import Slider from '@components/ui/bodykore/Sliders/Slider';
import HomeSection1 from '@components/ui/bodykore/Sections/HomeSection1';
import HomeSection2 from '@components/ui/bodykore/Sections/HomeSection2';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import OneReview from '@components/ui/bodykore/Sections/AboutSection4';
import HomeSection3 from '@components/ui/bodykore/Sections/HomeSection3';
import useWindowSize from '@lib/hooks/use-window-size';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import routes from '@config/routes';
import {
  CMSCollectionPage,
  Faqs,
  getCMSCollectionPage,
  getFaqs,
  getProjectsOfCategoryHome,
  ProjectCategoryHome,
} from 'services/graphCMS';
import {
  getShopifyCollectionPage,
  getShopifyCollectionQuery,
  ShopifyCollectionPage,
  ShopifyProductQuery,
} from 'services/shopify/storefront';
import { getHomeReviews, Review } from 'services/stamped';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { getHeros, Heros } from 'services/graphCMS/hero';
import ReactPlayer from 'react-player';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const shopifyData = await getShopifyCollectionPage('benches');
  const CMSData = await getCMSCollectionPage('benches');
  const faqs = await getFaqs();
  const reviews = await getHomeReviews();
  const heros = await getHeros();
  const projects = await getProjectsOfCategoryHome();
  const bestSeller = await getShopifyCollectionQuery("tag:bestseller");

  return {
    props: { header, CMSData, faqs, shopifyData, reviews, heros, projects, bestSeller },
    //// revalidate: 30 * 60,
  };
};
interface HomeParams {
  header: HeaderData;
  CMSData: CMSCollectionPage;
  faqs: Faqs;
  shopifyData: ShopifyCollectionPage;
  reviews: Review[];
  heros: Heros[];
  projects: ProjectCategoryHome[];
  bestSeller: ShopifyProductQuery;
}

export default function Home({
  header,
  CMSData,
  faqs,
  shopifyData,
  reviews,
  heros,
  projects,
  bestSeller
}: HomeParams) {
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
  };

  const mapCollections = () => {
    return header.categories.map((item) => ({
      url: item.image,
      topTitle: item.title,
      title: item.title,
      link: `${routes.collection.path}/${item.slug}`,
      subCategories: item.subcategories,
    }));
  };

  const mapPackages = () => {
    return bestSeller.products.edges.map((item) => ({
      url: item.node.featuredImage?.url,
      downTitle: item.node.title,
      title: item.node.title,
      link: `${routes.products.path}/${item.node.handle}`,
      subCategories: [],
    }));
  };
  const mayBanner = () => {
    return heros.map((item) => ({
      url: item.media.url,
      subTitle: item.subTitle,
      title: item.mainTitle,
      link: `${routes.products.path}/${item.url}`,
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;
  return (
    <>
      <SeoHeader seo={seo.home} />

      <div>
        <main className="w-full">
          {/* <SliderBanner bgImage={mayBanner()} /> */}
          <div className='player-wrapper'>
            <ReactPlayer
              className="video_player_index react-player"
              url={'https://bodykore.com/wp-content/uploads/2022/08/DYNAMICTRAINER.mp4'}
              playing={true}
              loop={true}
              controls={false}
              volume={0}
              width='100%'
              height='100%'
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
              onPlay={() => { }}
            />

          </div>

          <HomeSection1
            options={[
              {
                icon: '/svg/characteristics1.svg',
                title: 'AS LOW AS 0% APR FINANCING',
                description: 'From Affirm.',
              },
              {
                icon: '/svg/characteristics2.svg',
                title: 'EASY ASSEMBLY',
                description: 'Professional installation not required.',
              },
              {
                icon: '/svg/characteristics3.svg',
                title: 'WARRANTY INCLUDED',
                description: 'Industry Leading Warranty.',
              },
              {
                icon: '/svg/characteristics4.svg',
                title: 'NATIONWIDE SHIPPING',
                description: 'Over all 50 states.',
              },
            ]}
          />

          <div>
            {(
              <div className="py-16 px-5">
                <Slider
                  title1="BEST"
                  color1="text-black-373933"
                  title2="SELLERS"
                  color2="text-red-bc2026"
                  description=""
                  btnText=""
                  border=""
                  btnBorder=""
                  link={`${routes.collection.path}/packages`}
                  bgImage={mapPackages()}
                />
              </div>
            )}
          </div>
          <div>
            {(
              <div className="py-16 px-5">
                <Slider
                  title1="ALL"
                  color1="text-red-bc2026"
                  title2="PRODUCTS"
                  color2="text-black-373933"
                  description="From cable machines to dumbbells and everything in between, BodyKore’s extensive product lines have machines, equipment, and more for every type of fitness training."
                  btnText="SEE ALL PRODUCTS"
                  btnBorder="border-black-373933"
                  border="border"
                  link={routes.products.path}
                  bgImage={mapCollections()}
                />
              </div>
            )}
          </div>

          <HomeSection2
            title1="BENEFITS"
            title2="OF OWNING A HOME GYM"
            description="With multiple options to choose from, BodyKore’s premier selection of exercise and home gym equipment comes in a variety of different combinations all suited to your fitness needs."
            options={[
              {
                icon: '/svg/benefits1.svg',
                title: 'TIME SAVING',
              },
              {
                icon: '/svg/benefits2.svg',
                title: 'COMFORTABLE',
              },
              {
                icon: '/svg/benefits3.svg',
                title: 'CLEAN',
              },
              {
                icon: '/svg/benefits4.svg',
                title: 'INCREASE IN PROPERTY VALUE',
              },
              {
                icon: '/svg/benefits5.svg',
                title: 'PRIVACY',
              },
            ]}
          />

          <div className="py-16 px-8">
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

          {reviews.length !== 0 ? (
            <div className="bg-black py-16">
              <OneReview img={'/frontPage/Review.jpg'} reviews={reviews} />
            </div>
          ) : null}

          <div className="py-10">
            <HomeSection3
              title1="FREQUENTLY ASKED"
              title2="QUESTIONS"
              accordion={faqs.faqs.map((item) => ({
                question: item.question,
                answer: item.answer.html,
                type: item.faqType?.name,
              }))}
              filter={faqs.faqTypes.map((item) => item.name)}
            />
          </div>
        </main>
      </div>
    </>
  );
}
