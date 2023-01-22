import Head from 'next/head';
import SignUp from '../../components/ui/bodykore/Auth/SignUp';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { CategoryData, HeaderData, getHeader } from '@utils/header';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
   // revalidate: 30 * 60,
  };
};

interface SignUpPageParams {
  header: HeaderData;
}

//Pasamos como parametro (props) los posts
export default function SignUpPage({ header }: SignUpPageParams) {
  return (
    <>
    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <div>
        <Head>
          <title>BodyKore Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full">
          <SignUp />
        </main>
      </div>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
}
