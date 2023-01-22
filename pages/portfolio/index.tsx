import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import { GetServerSideProps } from 'next';
import {
  getProjectsOfCategory,
  getProjectsOfCategoryHome,
  ProjectCategory,
  ProjectInfo,
} from 'services/graphCMS';
import { NUM_PROJECTS } from '@config/siteConfig';
import { getHeader } from '@utils/header';
import routes from '@config/routes';
import seo from '../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getStrapiProjectCategories,
  ProjectCategoryStrapi,
} from 'services/strapi/project';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getProjectsOfCategoryHome();
  const projectsStrapi = await getStrapiProjectCategories();

  const projects = [];
  for (let i = 0; i < categories.length; i++) {
    projects.push(
      await getProjectsOfCategory(categories[i].slug, NUM_PROJECTS)
    );
  }
  const header = await getHeader();

  return {
    props: {
      projects,
      categories,
      header,
      projectsStrapi,
    },
  };
};

interface PortfolioParams {
  projects: ProjectInfo[][];
  categories: ProjectCategory[];
  projectsStrapi: ProjectCategoryStrapi;
}

const Portfolio = ({
  projects,
  categories,
  projectsStrapi,
}: PortfolioParams) => {
  const mapCategories = () => {
    return projectsStrapi.data.map((item) => ({
      text: item.attributes.title,
      id: item.attributes.slug,
    }));
  };

  const mapProjects = () => {
    return projectsStrapi.data.map((item, index) => {
      const space = item.attributes.title.indexOf(' ');
      return (
        <div className="px-8" key={index}>
          <SliderProgress
            title1={item.attributes.title.substring(0, space)}
            title2={item.attributes.title.substring(space + 1)}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            id={item.attributes.slug}
            bgImage={item.attributes.projects.data.map((subItem, i) => ({
              title: subItem.attributes.title,
              url:subItem.attributes.image.data[i] ?  mediaUrl + subItem.attributes.image.data[i].attributes.url : imageNotFound,
              link: `${routes.portfolio.path}/${subItem.attributes.slug}`,
            }))}
            width="w-1/2"
            link={`${routes.portfolio.path}/${item.attributes.slug}`}
          />
        </div>
      );
    });
  };

  return (
    <>
      <SeoHeader seo={seo.portfolio} />

      {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <FadingBanner
          title={'PORTFOLIO'}
          bgImage={'bg-portfolio-image'}
          description={''}
          height={'h-60'}
        />

        <NavOptions title1={'ALL'} titles={mapCategories()} />

        {mapProjects()}
      </main>
      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Portfolio;
