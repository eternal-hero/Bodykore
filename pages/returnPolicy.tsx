import React from 'react';
import ReturnPolicy from '@components/ui/bodykore/Sections/ReturnPolicy';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';
import { DefaultSeo } from 'next-seo';
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
   // revalidate: 30 * 60,
  };
};

interface ReturnPolicyPageParams {
  header: HeaderData;
}

const ReturnPolicyPage = ({ header }: ReturnPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.return_policy} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <ReturnPolicy
          title="RETURN/EXCHANGE POLICIES"
          subTitle="IMPORTANT:"
          text1="You may return/exchange an unused item in new condition within 30 days of purchase."
          text2="All items must include original packaging."
          paragraphs1={[
            {
              text: 'Continental US customers will be responsible for return shipping only (An exchanged item shipping via freight will be subject to a return shipping cost)',
            },
            {
              text: 'International customers will be responsible for shipping both ways',
            },
            {
              text: 'Closeout item sales are final. No returns or exchanges',
            },
            {
              text: 'Please allow 1-3 days for your return to be processed or an exchange to be sent',
            },
            {
              text: 'For larger items or defective items please call 949-325-3088 or email sales@bodykore.com to ensure you get the best service.',
            },
          ]}
          text3="You may return the items to the address below:"
          paragraphs2={[
            {
              text: 'BodyKore',
            },
            {
              text: 'Attn.: Return Dept',
            },
            {
              text: '7446 Orangewood Ave',
            },
            {
              text: 'Garden Grove, CA 92841',
            },
          ]}
        />
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default ReturnPolicyPage;
