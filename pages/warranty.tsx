import React from 'react';
import PlainRedBanner from '@components/ui/bodykore/Banners/PlainRedBanner';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import PlainText from '@components/ui/bodykore/Text/PlainText';
import PlainList from '@components/ui/bodykore/Text/PlainList';
import SubmissionForm from '@components/ui/bodykore/Sections/SubmissionForm';
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

interface WarrantyParams {
  header: HeaderData;
}

const Warranty = ({ header }: WarrantyParams) => {
  return (
    <>
      <SeoHeader seo={seo.warranty} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div className="pb-12">
          <PlainRedBanner />
        </div>

        <div className="px-10">
          <Blacktitle
            title="WARRANTY SPECIFICATIONS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-5 mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'Strength Equipment: Offers an industry leading 10 year warranty on our commercial equipment’s frame and 5 years on parts. We stand by our products and our industry leading 10 years prove this.',
              },
              {
                description:
                  'Cardio Equipment: 2 Years Frame, 1 year mechanical.',
              },
              {
                description: 'Weights and Bars: 2 Years.',
              },
              {
                description:
                  'As a part of our commitment to customer service, our Warranty Team is here to assist you with any troublesome equipment you may have purchased from us. We keep spare parts to most of the machines we sell and where we don’t have, we can do the leg work to get parts in for you. In order for us to assist you, we ask that you retain your invoice for proof of purchase. We also may request that you return a part to the warehouse as proof of the issue, however in most cases, clear photographs of the damaged part will suffice. To lodge a warranty claim, please use our warranty claim form or call us at 949-325-3088',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="CONDITIONS AND RESTRICTIONS"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="pt-5 pb-2 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'This warranty is valid only in accordance with the conditions set forth below:',
              },
            ]}
          />
        </div>

        <div className="mb-10 px-10">
          <PlainList
            textColor="text-black-373933"
            List={[
              {
                text: 'The warranty applies to product sold by BodyKore only if:',
                subText:
                  '- It has been serviced by an authorized BodyKore service provider',
                subText1:
                  '- It remains in the possession of the original purchaser and proof of purchase is demonstrated',
                subText2:
                  '- It has not been subjected to accident, misuse, abuse, improper service, or non-manufacturer modification',
              },
              {
                text: 'Claims are made within the warranty period.',
              },
              {
                text: 'This warranty does not cover damage or equipment failure caused by electrical wiring not in compliance with electrical codes advised or stipulated in the product owner’s manual specifications, or failure to provide reasonable and necessary maintenance as outlined in the owner’s manual.',
              },
              {
                text: 'BodyKore is not responsible for Internet connectivity to its products. This restriction applies to services, such as those provided by an Internet service provider (ISP), and also to hardware related to Internet connectivity, such as Ethernet cabling, routers, servers and switches.',
              },
              {
                text: 'BodyKore is not responsible for the quality of television, video, audio, or other media supplied to its products. This restriction applies to services, such as those provided by a cable or satellite television provider; to signal strength and clarity; and also to hardware related to the reception and delivery of television, video, audio, and other media. Such hardware can include (but is not limited to) audio, video, and radio-frequency (RF) cabling, connectors, receivers, modulators, combiners, distribution amplifiers, splitters, and so on.',
              },
              {
                text: 'BodyKore cannot guarantee that the heart rate measurement system on its products will work for all users. Heart rate measurement accuracy varies based on a number of factors, including the user’s physiology and age, the method in which the heart rate measurement system is used, external interference, and other factors that may influence heart rate acquisition.',
              },
              {
                text: 'BodyKore does not warranty the work or product of third party companies (e.g., head end systems, low voltage wiring, etc.).',
              },
              {
                text: 'BodyKore does not pay labour outside of the USA. Equipment limited warranty is void when equipment is installed in a country other than where sold.',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="WHAT IS COVERED?"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-5 mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'Equipment is warranted to be free from defects in materials and manufacturing.',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="WHO PAYS SHIPPING FOR SERVICE:"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-5 mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'If the equipment or any warranted part must be returned to a service facility for repairs, BodyKore will pay all shipping charges during the covered warranty period. The purchaser is responsible for shipping after the warranty has expired.',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="WHAT WE WILL DO TO CORRECT COVERED DEFECTS:"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-5 mb-5 px-10">
          <PlainText
            textColor="text-black-373933"
            textPosition="lg:text-left"
            paragraphs={[
              {
                description:
                  'We will repair, or if unable to be repaired, at our discretion, replace the covered equipment when it fails to perform as intended during normal usage. Parts will be replaced with like kind and quality, and may be new or remanufactured. If the covered equipment cannot be repaired or if parts are no longer available due to the age of the equipment or are discontinued by the Manufacturer, the unit will be replaced with a product of equal or similar features and functionality. Replacement parts and equipment are warranted for the remaining portion of the original warranty period.',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="NOT COVERED"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="py-5 mb-5 px-10">
          <PlainList
            textColor="text-black-373933"
            List={[
              {
                text: 'Damages or failure due to accident, abuse, neglect and misuse of equipment for anything other than its intended purpose.',
              },
              {
                text: 'Improper assembly or installation of parts or accessories not originally intended for the equipment.',
              },
              {
                text: 'General wear and tear, including upholstery and rust corrosion.',
              },
              {
                text: 'Lack of general maintenance and or failure to service or maintain the equipment correctly. This includes a lack of/over lubrication between the deck and the running belt or incorrect alignment/ adjustment of treadmill belts that result in damage.',
              },
              {
                text: 'Damages or failure due to the use of an improper power supply',
              },
              {
                text: 'Please note BodyKore requires an individual power circuit be used for each treadmill, along with surge protectors on all equipment that plugs in or warranty will be void.',
              },
              {
                text: 'Replacement of flat or corroded batteries due to non-use.',
              },
              {
                text: 'Damage caused by the surrounding environment or weather and failure to keep the equipment in a clean, dry environment (natural disasters, equipment used outdoors or near water, entry of foreign matter, dust or particles etc.)',
              },
              {
                text: 'Belts requiring tensioning due to stretching after use are not covered under warranty. A maintenance kit is provided on delivery with all orders to keep the equipment serviced as required.',
              },
              {
                text: 'A service callout fee will be applicable where no damage or failure can be found or if determined to be caused by a matter not covered under the warranty conditions.',
              },
            ]}
          />
        </div>

        <div className="px-10">
          <Blacktitle
            title="WARRANTY SUBMISSION"
            textSize="text-5xl"
            textColor="text-black-373933"
          />
        </div>

        <div className="pt-8 px-10">
          <SubmissionForm />
        </div>

        <div className="pt-5 pb-36 px-10">
          <TransparentBtn width="w-52" fontSize="text-sm" text="SUBMIT" />
        </div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default Warranty;
