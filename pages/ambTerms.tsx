import React from 'react';
import PlainList from '@components/ui/bodykore/Text/PlainList';
import DobleColorTitle from '@components/ui/bodykore/Text/Titles/DobleColorTitle';
import ListTitle from '@components/ui/bodykore/Text/Titles/ListTitle';
import PlainText from '@components/ui/bodykore/Text/PlainText';
import TransparentBtn from '@components/ui/bodykore/Buttons/TransparentBtn';
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

interface AmbTermsParams {
  header: HeaderData;
}

const AmbTerms = ({ header }: AmbTermsParams) => {
  return (
    <>
      <SeoHeader seo={seo.ambTerms} />
    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div className="h-4 bg-red-bc2026"></div>

        <div className="px-10">
          <DobleColorTitle
            title="AMBASSADOR PROGRAM"
            title2="TERMS AND CONDITIONS"
          />
        </div>

        {/*Requirements to Join section*/}
        <div className="ml-16 lg:ml-44 lg:mr-72 mt-16 max-w-7xl">
          <ListTitle icon="/svg/listLine.svg" title="Requirements to Join" />

          <div className="pt-5 px-10 leading-loose">
            <PlainList
              textColor="text-black-1c2023"
              textSize="text-sm lg:text-base"
              List={[
                {
                  text: 'Currently, BodyKore is only accepting new Affiliates within the U.S.',
                },
                {
                  text: 'Ambassadors must have a health and/or fitness-oriented blog, vlog, website, or social platform to be accepted into the Ambassador.',
                },
                {
                  text: 'Program.',
                },
                {
                  text: 'Pages will be vetted for engagement rate, as well as quality of audience traffic and following.',
                },
              ]}
            />
          </div>
        </div>

        <div className="border-b border-gray-400 pt-10 mx-44 max-w-7xl m-auto"></div>

        {/*Perks section*/}
        <div className="ml-16 lg:ml-44 lg:mr-72 mt-16 max-w-7xl">
          <ListTitle icon="/svg/listLine.svg" title="Perks" />

          <div className="pt-5 px-10 leading-loose">
            <PlainList
              textColor="text-black-1c2023"
              textSize="text-sm lg:text-base"
              List={[
                {
                  text: 'Commission-based Payouts:',
                  subText:
                    '- The more customers use your exclusive BodyKore Fitness link, the more money you will make from purchases.',
                },
                {
                  text: 'Exclusive Discount Code:',
                  subText:
                    '- Discount code provided upon acceptance into the program.',
                  subText1:
                    '- Code is for personal orders only. Disclosing the code to Family, Friends or Followers will result in removal from the program.',
                  subText2:
                    '- Discounts have the chance to increase based off performance.',
                },
                {
                  text: 'One-on-One contact with our Ambassador Department',
                  subText:
                    '- Work with a representative to make manual orders as needed.',
                  subText1: '- Potential for first dibs on new product drops.',
                  subText2: '- Allows for quickest shipping times.',
                },
              ]}
            />
          </div>
        </div>

        <div className="border-b border-gray-400 pt-10 mx-44 max-w-7xl m-auto"></div>

        {/*Terms and conditions section*/}
        <div className="flex justify-start pt-10 max-w-7xl m-auto">
          <TransparentBtn text="SIGN UP" width="w-48" fontSize="text-sm" />
        </div>

        <div className="ml-16 lg:mx-48 lg:mr-72 mt-16 max-w-7xl">
          <ListTitle icon="/svg/listLine.svg" title="Terms and Conditions" />

          <div className="pt-5 px-10 leading-loose">
            <PlainList
              textColor="text-black-1c2023"
              textSize="text-sm lg:text-base"
              List={[
                {
                  text: 'You may not use paid advertising in search engines, social media, or other public forums.',
                },
                {
                  text: 'All refunds or returns will be removed from any sales commissions. BodyKore reserves the right to deduct from future commissions for any commissions received from a refunded or returned order.',
                },
                {
                  text: 'You may not receive credit for referring yourself.',
                },
                {
                  text: 'If an Affiliate wishes to announce a new BodyKore product launch, it must be done at least 1 hour after our social media post is released.',
                },
                {
                  text: 'Affiliates/Ambassadors are expected to thoroughly research comparable over-seas manufactured products to ensure they aren’t a BodyKore knock-off prior to engaging in any promotion of the product, especially BodyKore’s top tier products.',
                },
                {
                  text: 'While we understand and appreciate the need to be objective in your reviews, we request a minimum of one (business) days’ notice prior to posting a derogatory or negative review or our products so that we may look to remedy the situation and prepare our responses to customer service inquires accordingly.',
                },
                {
                  text: 'BodyKore will monitor Ambassador content to ensure adherence to new and existing program requirements. BodyKore reserves the right to void Ambassador credit and they will not receive payouts. Additionally, they may be banned from further participation in our Ambassador program.',
                },
                {
                  text: 'If an Ambassador releases a video that contains inaccurate information about a BodyKore product, BodyKore reserves the right to request that Ambassador revise their content with correct information, especially if that information is glaringly incorrect and/or detrimental to sales.',
                  subText:
                    '- BodyKore reserves the right to stop paying out commissions while videos with incorrect information about BodyKore are active',
                  subText1:
                    '- BodyKore is happy to answer and clarify any items of importance',
                },
                {
                  text: 'To remain in the Ambassador program, you must remain an active Ambassador and successfully generate a consistent number of sales: We have the right to terminate any ambassador from the program!',
                },
              ]}
            />
          </div>
        </div>

        <div className="border-b border-gray-400 pt-10 mx-44 max-w-7xl m-auto"></div>

        {/*Payout Guidelines section*/}
        <div className="ml-16 lg:mx-48 lg:mr-72 mt-16 max-w-7xl">
          <ListTitle icon="/svg/listLine.svg" title="Payout Guidelines" />

          <div className="pt-5 px-10 leading-loose">
            <PlainList
              textColor="text-black-1c2023"
              textSize="text-sm lg:text-base"
              List={[
                {
                  text: 'You will need to fill out a W9 form in order to be paid by check at the end of each month.',
                },
                {
                  text: 'You will not receive credit for shipping or sales tax.',
                },
                {
                  text: 'You will not receive credit for referring yourself.',
                },
                {
                  text: 'All earned commissions will be attributed to your account once the sale is displayed as “complete” in our system.',
                },
              ]}
            />
          </div>
        </div>

        <div className="border-b border-gray-400 pt-10 mx-44 max-w-7xl m-auto"></div>

        {/*Commission Tiers section*/}
        <div className="ml-16 lg:mx-48 lg:mr-80 mt-16 max-w-7xl">
          <ListTitle icon="/svg/listLine.svg" title="Commission Tiers" />

          <div className="px-8 pt-5">
            <PlainText
              textSize="text-sm lg:text-base"
              textPosition="lg:text-left"
              paragraphs={[
                {
                  description:
                    'When you become a BodyKore Ambassador, our goal is to develop a win-win, long term relationship with you. We reward your performance and dedication to growing the BodyKore fam by offering the most competitive commission rates in the industry. Each of our two Ambassador tiers feature unique perks like equipment discounts, high earnings, and more! Upon acceptance into the Ambassador program, you’ll automatically become a Tier 1 BodyKore Affiliate. As you grow, you’ll have the opportunity to “climb the ladder” to Tier 2 Ambassador.',
                },
              ]}
            />
            <div className="pt-5">
              <PlainText
                textSize="text-sm lg:text-base"
                textPosition="lg:text-left"
                paragraphs={[
                  {
                    description:
                      'More information about how to reach each tier will be provided once you’re accepted in the program. Our commission rates are as follows:',
                  },
                ]}
              />
            </div>
          </div>

          <div className="pt-5 px-10 leading-loose">
            <PlainList
              textColor="text-black-1c2023"
              textSize="text-sm lg:text-base"
              List={[
                {
                  text: 'Ambassador – 5% commission',
                },
                {
                  text: 'Team BodyKore – 10% commission',
                },
              ]}
            />
          </div>
        </div>

        <div className="border-b border-gray-400 pt-10 max-w-7xl m-auto pb-20"></div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default AmbTerms;
