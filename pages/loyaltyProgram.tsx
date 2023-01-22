import React from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import FinanceSection3 from '@components/ui/bodykore/Sections/FinanceSection3';
import LoyaltySection1 from '@components/ui/bodykore/Sections/LoyaltySection1';
import LoyaltySection2 from '@components/ui/bodykore/Sections/LoyaltySection2';
import LoyaltySection3 from '@components/ui/bodykore/Sections/LoyaltySection3';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import { NextSeo } from 'next-seo'
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
   // revalidate: 30 * 60,
  };
};

interface LoyaltyProgramParams {
  header: HeaderData;
}

const LoyaltyProgram = ({ header }: LoyaltyProgramParams) => {
  return (
    <>
      <SeoHeader seo={seo.loyaltyProgram} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div>
          <MainBanner
            title={'BODYKORE LOYALTY PROGRAM'}
            description={'Earn points and rewards every time you shop'}
            bgImage={'LoyaltyProgram/coverImageLoy.jpg'}
            buttonsText={[
              {
                text: 'CREATE ACCOUNT',
                color: 'transparent',
                link:'/auth/signup'
              },
              {
                text: 'LOG IN',
                color: 'transparent',
                link:'/auth/signin'
              },
            ]}
            width='w-4/6'
          />
        </div>

        <FinanceSection3
          title="HOW IT WORKS"
          options={[
            {
              num: '01',
              title: 'SIGN UP',
              description: 'Create an account and get 100 points',
            },
            {
              num: '02',
              title: 'EARN POINTS',
              description: 'Earn points every time you shop',
            },
            {
              num: '03',
              title: 'REDEEM POINTS',
              description: 'Redeem points for exclusive discounts',
            },
          ]}
        />

        <LoyaltySection1
          title1="HOW TO USE YOUR"
          title2="POINTS"
          description="Redeeming your points is easy! Click Redeem My Points and copy and paste your code at checkout or apply to your subscription."
          points="100 POINTS = $1"
          btnText="REDEEM MY POINTS"
          discountRow1={[
            {
              discount: '5% OFF',
              points: '500 POINTS',
            },
            {
              discount: '10% OFF',
              points: '1000 POINTS',
            },
          ]}
          discountRow2={[
            {
              discount: '15% OFF',
              points: '1500 POINTS',
            },
            {
              discount: '25% OFF',
              points: '2500 POINTS',
            },
          ]}
        />

        <LoyaltySection2
          title="WAYS TO EARN POINTS"
          optionsRow1={[
            {
              icon: '/svg/points1.svg',
              title: '100 POINTS',
              description: 'Create an account',
            },
            {
              icon: '/svg/points2.svg',
              title: '200 POINTS',
              description: 'Product review',
            },
            {
              icon: '/svg/points3.svg',
              title: '50 POINTS',
              description: 'Happy Birthday',
            },
            {
              icon: '/svg/points4.svg',
              title: '50 POINTS',
              description: 'Subscribe to our newsletter',
            },
          ]}
          optionsRow2={[
            {
              icon: '/svg/points5.svg',
              title: '20 POINTS',
              description: 'Follow on Instagram',
            },
            {
              icon: '/svg/points6.svg',
              title: '20 POINTS',
              description: 'Share on Facebook',
            },
            {
              icon: '/svg/points7.svg',
              title: '20 POINTS',
              description: 'Follow on Twitter',
            },
            {
              icon: '/svg/points8.svg',
              title: '20 POINTS',
              description: 'Subscribe to our YouTube Channel',
            },
          ]}
        />

        <LoyaltySection3
          title1="REFER A"
          title2="FRIEND"
          description="Give 5%, Get 5% . Give your friends 5% off their first order and get 5% for each successful referral"
          btnText1="CREATE ACCOUNT"
          btnText2="SIGN IN"
        />
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default LoyaltyProgram;
