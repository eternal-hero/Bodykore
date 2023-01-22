import React, { useEffect, useState } from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import BlogCards from '@components/ui/bodykore/Cards/BlogCards';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import Pagination from '@components/ui/bodykore/Pagination';
import { GetServerSideProps } from 'next';
import {
  ArticleCategory,
  ArticleInfo,
  getAllArticles,
  getArticleCategories,
} from 'services/graphCMS';
import { dateFormat } from 'utils/date';
import { NUM_ARTICLES, NUM_FEATURED } from '@config/siteConfig';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { NextSeo } from 'next-seo'
import seo from "../../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articles = await getAllArticles();
  const categories = await getArticleCategories();
  const header = await getHeader();

  return {
    props: {
      articles,
      categories,
      header,
    },
   // revalidate: 30 * 60,
  };
};

interface BlogParams {
  articles: ArticleInfo[];
  categories: ArticleCategory[];
  header: HeaderData;
}

const Blog = ({ articles, categories, header }: BlogParams) => {
  const [filter, setFilter] = useState({
    page: 1,
    category: '',
  });
  const [maxArticles, setMaxArticles] = useState(
    Math.ceil(articles.length / NUM_ARTICLES)
  );
  const [articlesShow, setArticlesShow] = useState(articles);

  useEffect(() => {
    const { page, category } = filter;
    let displayedArticles: ArticleInfo[] = articles;
    if (category !== '') {
      displayedArticles = articles.filter(
        (item) => item.category?.slug === category
      );
    }
    setArticlesShow(
      displayedArticles.slice((page - 1) * NUM_ARTICLES, page * NUM_ARTICLES)
    );
    setMaxArticles(Math.ceil(displayedArticles.length / NUM_ARTICLES));
  }, [filter]);

  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.title,
      id: item.slug,
    }));
  };

  const mapArticles = () => {
    return articlesShow.map((item) => ({
      img: item.image?.url,
      topic: item.category?.title,
      date: dateFormat(item.date),
      title: item.title,
      description: item.description,
      slug: item.slug,
    }));
  };

  const mapFeatured = () => {
    return articles.slice(0, NUM_FEATURED).map((item) => ({
      img: item.image?.url,
      topic: item.category?.title,
      date: dateFormat(item.date),
      title: item.title,
      description: item.description,
      slug: item.slug,
    }));
  };

  return (
    <>
      <SeoHeader seo={seo.blog} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <MainBanner
          title={'BODYKORE BLOG'}
          description={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit sapien. Mauris et ante in quam pretium malesuada ac a massa. Vestibulum lacinia augue et dolor ullamcorper efficitur.'
          }
          bgImage={'/Blog/coverImage.jpg'}
        />

        <div
          id="belowBanner"
          className="flex flex-row flex-wrap-reverse justify-center lg:justify-start max-w-7xl m-auto px-8 gap-8 lg:gap-0"
        >
          <div className="lg:w-1/2 pt-14 lg:pl-20">
            <Blacktitle
              title={'LATEST ARTICLES'}
              textSize={'text-5xl'}
              textColor="text-black-373933"
            />
          </div>

          <div className='lg:w-1/2 flex justify-end lg:pr-24 pt-10 lg:pt-0'>
            <NavOptions
              title1={'ALL'}
              titles={mapCategories()}
              type={filter.category}
              setter={setFilter}
            />
          </div>
        </div>

        <BlogCards card={mapArticles()} />

        <Pagination
          current={filter.page}
          setter={setFilter}
          max={maxArticles}
        />

        <div className="lg:pl-48">
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

export default Blog;
