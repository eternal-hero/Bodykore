import React from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import InvisibleBanner from '@components/ui/bodykore/Banners/InvisibleBanner';
import ImgDescription from '@components/ui/bodykore/Sections/ImgDescription';
import DobleColorTitle from '@components/ui/bodykore/Text/Titles/DobleColorTitle';
import AmbBanner from '@components/ui/bodykore/Banners/AmbBanner';
import BecomeAnAmb from '@components/ui/bodykore/Sections/AmbSection1';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import { NextSeo } from 'next-seo'
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';
import { Richtext } from 'services/graphCMS';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
   // revalidate: 30 * 60,
  };
};

interface AmbassadorsParams {
  header: HeaderData;
}

const Ambassadors = ({ header }: AmbassadorsParams) => {
  return (
    <>
      <SeoHeader seo={seo.ambassador} />


    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <div>
        <main className="w-full">
          <MainBanner
            bgImage={'/Ambassadors/coverImageAmb.jpg'}
            title={'MEET OUR AMBASSADORS'}
            description={
              'Our goal is to develop a win-win, long term relationship with you. We reward your performance and dedication to growing the BodyKore fam by offering the most competitive commission rates in the industry.'
            }
            buttonsText={[
              {
                text: 'WHO THEY ARE',
                color: 'transparent',
              },
              {
                text: 'LEARN MORE',
                color: 'transparent',
                link: '/ambTerms',
              },
            ]}
            width='w-4/6 lg:w-3/6'
          />

          <InvisibleBanner 
            height='h-10'
            id='belowBanner'
          />

          <div className="flex justify-center py-6">
            <DobleColorTitle title="HOW WE WORK" title2="TOGETHER" />
          </div>

          {/* <ImgDescription
            imgHeight="h-16"
            imgWidth="w-14"
            images={[
              {
                img: '/svg/howWeWork1.svg',
                title: '01',
                description:
                  'Our ambassadors embrance everything we do from health, fitness and a positive mindset.' as unknown as Richtext,
              },
              {
                img: '/svg/howWeWork4.svg',
                title: '02',
                description:
                  "Team Bodykore athletes take part in photo and video shoots." as unknown as Richtext,
              },
              {
                img: '/svg/howWeWork3.svg',
                title: '03',
                description:
                  'Our athletes sweat hard working out on Bodykore fitness equipment and give is critical feedback.' as unknown as Richtext,
              },
            ]}
          /> */}

          <div className="pt-32">
            <AmbBanner
              title1="BRAND AMBASSADOR"
              title2="PERKS"
              description="As a BodyKore Brand Ambassador, you’ll enjoy awesome perks, free products, and sales commission on referred purchases."
              iconsRow1={[
                {
                  icon: '/svg/ambBanner1.svg',
                  title: 'REWARDS',
                },
                {
                  icon: '/svg/ambBanner2.svg',
                  title: 'PROMOTIONAL ITEMS',
                },
                {
                  icon: '/svg/ambBanner3.svg',
                  title: 'SNEAK PEEKS',
                },
              ]}
              iconsRow2={[
                {
                  icon: '/svg/ambBanner4.svg',
                  title: 'VIP GIVEAWAYS',
                },
                {
                  icon: '/svg/ambBanner5.svg',
                  title: 'SALES COMMISSION',
                },
                {
                  icon: '/svg/ambBanner6.svg',
                  title: 'EXCLUSIVE CONTENT',
                },
              ]}
            />
          </div>

          <div className="pb-64 px-8">
            <BecomeAnAmb
              title1="BECOME AN"
              title2="AMBASSADOR"
              text="As an ambassador, you'll test drive our latest gear, get development tools and experiences, and connect with like-minded people. Come see us in store to start the conversation about becoming an ambassador."
              btnText1="REGISTER"
              btnText2="LEARN MORE"
              link= '/ambTerms'
              img="/Ambassadors/becomeAmb.jpg"
            />
          </div>
        </main>
      </div>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Ambassadors;
