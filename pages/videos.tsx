import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import Video from '@components/ui/bodykore/Video';
import { GetServerSideProps } from 'next';
import {
  getVideoCategories,
  getVideosOfCategory,
  VideoCategory,
  VideoInfo,
} from 'services/graphCMS';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Footer from '@components/Footer';
import Header from '@components/Header';
import seo from "../public/SEO/en.json";
import { NextSeo } from 'next-seo'
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getVideoCategories();
  const videos = [];
  for (let i = 0; i < categories.length; i++) {
    videos.push(await getVideosOfCategory(categories[i].slug));
  }
  const header = await getHeader();

  return {
    props: {
      videos,
      categories,
      header,
    },
   // revalidate: 30 * 60,
  };
};

interface VideosParams {
  videos: VideoInfo[][];
  categories: VideoCategory[];
  header: HeaderData;
}

const Videos = ({ videos, categories, header }: VideosParams) => {
  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.title,
      id: item.slug,
    }));
  };

  const mapVideos = () => {
    return categories.map((item, index) => {
      const space = item.title.indexOf(' ');
      return (
        <Video
          key={index}
          id={item.slug}
          title1={item.title.substring(0, space)}
          title2={item.title.substring(space + 1)}
          description={item.description}
          videos={videos[index].map((item) => ({
            url: item.video,
            title: item.title,
          }))}
        />
      );
    });
  };

  return (
    <>
      <SeoHeader seo={seo.videos} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <FadingBanner
          title={'ALL VIDEOS'}
          bgImage={'bg-manuals-image'}
          description={
            ''
          }
          height={'h-72'}
        />

        <NavOptions title1={'ALL'} titles={mapCategories()} />
        <div className="max-w-7xl m-auto pl-14"></div>

        {mapVideos()}
      </main>
      {/* <Footer productCat={header.categories} /> */}
    </>
  );
};

export default Videos;
