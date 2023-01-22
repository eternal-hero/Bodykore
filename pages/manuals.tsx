import React, { useEffect, useState } from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import ManualCards from '@components/ui/bodykore/Cards/ManualCards';
import { GetServerSideProps } from 'next';
import {
  getAllManuals,
  getManualCategories,
  Manual,
  ManualCategory,
} from 'services/graphCMS';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { NextSeo } from 'next-seo'
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const manuals = await getAllManuals();
  const categories = await getManualCategories();
  const header = await getHeader();

  return {
    props: {
      manuals,
      categories,
      header,
    },
   // revalidate: 30 * 60,
  };
};

interface ManualsParams {
  manuals: Manual[];
  categories: ManualCategory[];
  header: HeaderData;
}

const Manuals = ({ manuals, categories, header }: ManualsParams) => {
  const [filter, setFilter] = useState({
    page: 1,
    category: '',
  });
  const [manualsShow, setManualsShow] = useState(manuals);

  useEffect(() => {
    const { category } = filter;
    let displayedManuals: Manual[] = manuals;
    if (category !== '') {
      displayedManuals = manuals.filter(
        (item) => item.manualCategory?.slug === category
      );
    }
    setManualsShow(displayedManuals);
  }, [filter]);

  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.title,
      id: item.slug,
    }));
  };

  const mapManuals = () => {
    return manualsShow.map((item) => ({
      image: item.image?.url,
      category: item.manualCategory?.title,
      title: item.title,
      ref: item.reference,
      file: item.file?.url,
    }));
  };
  return (
    < >
      <SeoHeader seo={seo.manuals} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <FadingBanner
          title={'ALL MANUALS'}
          bgImage={'bg-manuals-image'}
          description={
            ''
          }
          height={'h-72'}
        />

        <NavOptions
          title1={'ALL'}
          titles={mapCategories()}
          type={filter.category}
          setter={setFilter}
        />

        <div className='pb-20'>
          <ManualCards card={mapManuals()} />
        </div>

      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Manuals;
