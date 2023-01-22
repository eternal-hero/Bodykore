import React from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import InvisibleBanner from '@components/ui/bodykore/Banners/InvisibleBanner';
import FinanceSection1 from '@components/ui/bodykore/Sections/FinanceSection1';
import FinanceSection2 from '@components/ui/bodykore/Sections/FinanceSection2';
import FinanceSection3 from '@components/ui/bodykore/Sections/FinanceSection3';
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

interface FinanceParams {
  header: HeaderData;
}

const Finance = ({ header }: FinanceParams) => {
  return (
    <>
      <SeoHeader seo={seo.finance} />
    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <div>
        <main className="w-full">
          <MainBanner
            bgImage={'/Finance/coverImageFin.jpg'}
            title={'FINANCING'}
            description={
              ''
            }
          />

          <InvisibleBanner
            height='h-44'
            id='belowBanner'
          />

          <FinanceSection1
            title1="PAY OVER THE"
            title2="TIME"
            text="FINANCE YOUR GYM EQUIPMENT YOUR WAY WITH AFFIRM-BREAD OR PAY TOMORROW
            3 Different Options for all types of credits. Our flexible financing plans lets buyers spread their payments out no matter what their credit is.
            Choose Affirm or Split-it at checkout to buy now, pay later. You can apply for financing at one or all of the lenders to see which one fits you best. The Affirm and Bread Payment applications are soft pull inquiries that do not show up on your credit. Pay Tomorrow lends up to $20,000 and you can spread that over a 48 month term. Please contact us if you need help with the application process or if you aren’t sure which one to choose."
            bkLogo="/Finance/LOGO.jpg"
            plus="+"
            affirmLogo="/Finance/affirmLogo.jpg"
          />

          <FinanceSection2
            options={[
              {
                num: '$0',
                text: 'DOWN*',
              },
              {
                num: '$60',
                text: 'PER MONTH',
              },
              {
                num: '0%',
                text: 'APR',
              },
            ]}
            title1="MONTHLY"
            title2="FINANCING"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit sapien. Quisque vel mauris odio. Mauris et ante in quam pretium malesuada ac a massa."
            subText="*Duis a dolor a lectus dapibus vehicula. Cras ut urna eget lacus venenatis cursus sit amet eget diam. Integer ultrices elit lectus, non sodales arcu ullamcorper id."
          />

          <div className="pb-56">
            <FinanceSection3
              title="HOW IT WORKS"
              options={[
                {
                  num: '01',
                  title: 'ADD A PRODUCT TO YOUR CART AND BUY WITH AFFIRM',
                  description:
                    'Check Affirm Financing as your payment method at checkout',
                },
                {
                  num: '02',
                  title: 'COMPLETE THE APPLICATION',
                  description:
                    'Enter your personal information and receive a decision immediately',
                },
                {
                  num: '03',
                  title: 'CHOOSE YOUR PAYMENT PLAN',
                  description:
                    'Select a flexible payment plan from 24, 36, or 39 months.',
                },
                {
                  num: '04',
                  title: 'MANAGE YOUR PAYMENTS',
                  description: 'in the Affirm App',
                },
              ]}
            />
          </div>
          <a className="affirm-site-modal" data-page-type="banner" style={{ cursor: 'pointer' }} aria-label="<img class=&quot;affirmlog&quot; src=&quot;https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.svg&quot;>- Affirm Financing (opens in modal)">
            <img className="affirmlog" src="https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.svg" />
          </a>
        </main>
      </div>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Finance;
