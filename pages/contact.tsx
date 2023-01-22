import React from 'react';
import ContactSection from '@components/ui/bodykore/Sections/ContactSection';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
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
      <SeoHeader seo={seo.contact} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <ContactSection
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