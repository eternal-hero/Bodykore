import SingleArticle from '@components/ui/bodykore/Sections/Article';
import ImageBanner from '@components/ui/bodykore/Banners/ImageBanner';
import BlogCards from '@components/ui/bodykore/Cards/BlogCards';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import { NUM_ARTICLES, NUM_FEATURED } from '@config/siteConfig';
import { dateFormat } from '@utils/date';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import {
  getAllArticlesSlug,
  getArticle,
  Article,
  getAllArticles,
  ArticleInfo,
} from 'services/graphCMS';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { NextSeo } from 'next-seo'
import seo from "../../../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

// export const getStaticPaths = async () => {
//   const articles = await getAllArticlesSlug();

//   const paths = articles.map(({ slug }) => ({ params: { slug } })).flat();

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
  const article = await getArticle(slug as string);

  if (article === undefined) {
    return {
      notFound: true,
    };
  }

  const articles = await getAllArticles(NUM_FEATURED);
  const header = await getHeader();

  return {
    props: { article, articles, header },
   // revalidate: 30 * 60,
  };
};

interface SingleBlogParams {
  article: Article;
  articles: ArticleInfo[];
  header: HeaderData;
}

const SingleBlog = ({ article, articles, header }: SingleBlogParams) => {
  const mapFeatured = () => {
    return articles.map((item) => ({
      img: item.image?.url,
      topic: item.category?.title,
      date: dateFormat(item.date),
      title: item.title,
      description: item.description,
      slug: item.slug,
    }));
  };

  // dynamically change seo title
  const dinamycSeo = () => {
    return seo.post;
  }

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div>
          <ImageBanner height={'h-96'} bgImage={article.image?.url} />
        </div>

        <div className="px-10 lg:px-52 pt-20 pb-16 lg:pb-0">
          <SingleArticle
            topic={article.category?.title}
            title={article.title}
            date={dateFormat(article.date)}
            readingTime={article.readTime}
            content={article.content.html}
          />
        </div>

        <div className="lg:pl-48 lg:pt-20">
          <Blacktitle
            title={'FEATURED ARTICLES'}
            textSize={'text-5xl'}
            textColor="text-black-373933"
          />
        </div>

        <div className="pb-28">
          <BlogCards card={mapFeatured()} />
        </div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default SingleBlog;
