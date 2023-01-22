import React from 'react';
import PlainRedBanner from '@components/ui/bodykore/Banners/PlainRedBanner';
import PlainText from '@components/ui/bodykore/Text/PlainText';
import ColumnListText from '@components/ui/bodykore/Text/ColumnListText';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import LogoDescription from '@components/ui/bodykore/Sections/LogoDescription';
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

interface GymSolutionsParams {
  header: HeaderData;
}

const GymSolutions = ({ header }: GymSolutionsParams) => {
  return (
    <>
      <SeoHeader seo={seo.gymSolutions} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <PlainRedBanner />

        <div className="pt-10 lg:px-52">
          <Blacktitle
            title={'FULL GYM SOLUTIONS'}
            textSize={'text-4xl'}
            textColor="text-black-373933"
          />
        </div>

        <div className="px-10 lg:px-56 py-4 pb-20 lg:pb-10">
          <PlainText
            textColor={'text-black-373933'}
            textPosition={'md:text-left'}
            paragraphs={[
              {
                description:
                  'BodyKore is a turn-key solution to health and fitness. Our dynamic professional representatives and enthusiastic team members can provide you with everything you need for your health club or gym. We provide specialized Interior Designers, Fitness Consultants/Trainers and cutting-edge equipment to ensure your project’s success. Our turn-key solution saves you time and money.Contact us today about our gym solution services, start-up gym packages and easy financing.',
              },
            ]}
          />
        </div>

        <div className="lg:px-52">
          <Blacktitle
            title={'OUR SERVICES'}
            textSize={'text-4xl'}
            textColor="text-black-373933"
          />
        </div>

        <div className="py-6 lg:py-2 pb-20 lg:pb-10 lg:px-56">
          <ColumnListText
            listText={[
              [
                {
                  text: 'Expert Consultation',
                },
                {
                  text: 'Turn Key Solution',
                },
                {
                  text: 'Interior Design',
                },
                {
                  text: 'Layout Design',
                },
                {
                  text: 'Private labeling',
                },
              ],
              [
                {
                  text: 'Mirrors',
                },
                {
                  text: 'Signage',
                },
                {
                  text: 'Gym Flooring',
                },
                {
                  text: 'Equipment Installation',
                },
                {
                  text: 'Machine Repair/Service',
                },
              ],
            ]}
          />
        </div>

        <div className="lg:px-52">
          <Blacktitle
            title={'PROJECT EXPERIENCE'}
            textSize={'text-4xl'}
            textColor="text-black-373933"
          />
        </div>

        <div className="py-6 lg:py-2 pb-32 lg:pb-16 lg:px-56">
          <ColumnListText
            listText={[
              [
                {
                  text: 'Education (K-12)',
                },
                {
                  text: 'Fire / Police Station',
                },
                {
                  text: 'Hotel / Motel',
                },
                {
                  text: 'Apartments & Condominiums',
                },
                {
                  text: 'Jail / Prison',
                },
                {
                  text: 'Club House / Community',
                },
                {
                  text: 'Center',
                },
              ],
              [
                {
                  text: 'Residential Building',
                },
                {
                  text: 'Single Family Residential',
                },
                {
                  text: 'Athletic Field',
                },
                {
                  text: 'Medical Office',
                },
                {
                  text: 'Military',
                },
                {
                  text: 'School / College / University',
                },
                {
                  text: 'Golf Course',
                },
              ],
              [
                {
                  text: 'Government',
                },
                {
                  text: 'House',
                },
                {
                  text: 'Office Building',
                },
                {
                  text: 'Arena / Stadium',
                },
                {
                  text: 'Assisted Living',
                },
                {
                  text: 'Misc Project',
                },
                {
                  text: 'Fitness Center',
                },
              ],
            ]}
          />
        </div>

        <div className="lg:px-52">
          <Blacktitle
            title={'EQUIPMENT'}
            textSize={'text-4xl'}
            textColor="text-black-373933"
          />
        </div>

        <LogoDescription
          card={[
            {
              svg: '/svg/cart.svg',
              title1: 'COMMERCIAL',
              title2: 'FITNESS EQUIPMENT',
              description:
                'Smith Machines, Leg Press, Hack Squat, Squat Racks, Olympic Benches, Military Benches, Utility Benches, Flat Benches, Lat Machines, Seated Calf Raise, Back Hyperextension, Roman Chairs, Power Towers, Chin/Dip Tower, Vertical Knee Raises (VKR), Dual Adjustable Pulley Systems (DAPS), Plate Loaded Machines, Selectorized Strength Machines, Hip Abductor, Leg Extension, Cable Cross, Chest Press',
            },
            {
              svg: '/svg/weight.svg',
              title1: 'FUNCTIONAL',
              title2: 'TRAINING EQUIPMENT',
              description:
                'Group Training Rack Systems, Storage Racks, Crossfit Rigs, Olympic Lifting Platforms, Bumper Plates, Kettlebells, Wall Balls, Slam Balls, TRX, Suspension Trainers, Resistance Bands, Yoga Bands, Yoga Mats, Power Bags, Maces, Clubbells, Battle Ropes, Plyoboxes',
            },
            {
              svg: '/svg/cardio.svg',
              title1: 'CARDIO',
              title2: 'EQUIPMENT',
              description:
                'Group Training Rack Systems, Storage Racks, Crossfit Rigs, Olympic Lifting Platforms, Bumper Plates, Kettlebells, Wall Balls, Slam Balls, TRX, Suspension Trainers, Resistance Bands, Yoga Bands, Yoga Mats, Power Bags, Maces, Clubbells, Battle Ropes, Plyoboxes',
            },
          ]}
        />
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default GymSolutions;
