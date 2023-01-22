import React from 'react';
import CookiesPolicy from '@components/ui/bodykore/Sections/CookiesPolicy';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
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

interface CookiesPolicyPageParams {
  header: HeaderData;
}

const CookiesPolicyPage = ({ header }: CookiesPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.cookies} />
    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div className="h-4 bg-red-bc2026"></div>
        <div className='pt-20 pb-16'>
            <CookiesPolicy
            title="COOKIES POLICY"
            paragraphs={[
                { text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dui neque, rhoncus et sapien eu, viverra cursus urna. Quisque iaculis urna et viverra accumsan. Praesent commodo lectus vitae velit commodo imperdiet. Nam vulputate nunc vel sem rhoncus, eu ullamcorper odio imperdiet. Nam tristique sapien vitae efficitur tincidunt. Ut eget laoreet lacus. Pellentesque et risus vulputate, pulvinar ligula eget, egestas mi. Sed mollis felis lorem, sed mollis augue malesuada malesuada. Vestibulum fringilla ex id rhoncus pharetra. Morbi tempus libero at magna efficitur mollis. Curabitur nec mollis risus. Ut nec magna malesuada, dignissim quam sit amet, suscipit magna. Maecenas vitae pretium leo, et congue sem. Nunc tristique mauris nulla, non dapibus augue viverra a.' },
                { text:'Mauris consectetur laoreet nulla, ut blandit tortor aliquam id. In et dui volutpat, aliquet est eu, iaculis tortor. Etiam tincidunt condimentum orci, vel lacinia diam ultricies mattis. Pellentesque quam odio, porttitor viverra lectus eu, congue congue massa. Duis ac lectus nulla. Sed a metus quis quam rutrum luctus. Sed eu odio ut ante bibendum pulvinar.' },
                { text:'Phasellus pretium pellentesque justo, quis gravida lorem vulputate eget. Pellentesque tempor varius urna id viverra. Cras tempus convallis mi. Aliquam venenatis orci dui, eu ultrices massa porttitor ut. Nunc tortor elit, varius a pretium nec, pharetra id lectus. Fusce cursus nec ex in commodo. Phasellus commodo odio quis tellus venenatis, at imperdiet enim ornare. Integer vel volutpat felis, sed vehicula ligula.' },
                { text:'Duis ut elementum ex. In id lectus vitae augue pretium vestibulum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse purus elit, semper vel mi in, euismod tincidunt lectus. Etiam id suscipit lacus, a commodo libero. Integer a fermentum libero. Etiam rhoncus interdum ligula, nec iaculis ex mollis euismod.' },
            ]}
            />
        </div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default CookiesPolicyPage;