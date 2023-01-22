import '@assets/main.css';
// import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css';
import React, { useEffect, Suspense } from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Layout from '@components/Layout';
import { ProductCompare } from '@components/ui/bodykore/Sections/Product';
import { ProductCompareBuilderProvider } from '@lib/productCompareContext';
import { SnackbarProvider } from 'nextjs-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
      <RecoilRoot>
        <ProductCompareBuilderProvider
          productCompare={[] as ProductCompare[]}
          compareIds={''}
        >
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ProductCompareBuilderProvider>
      </RecoilRoot>
    </SnackbarProvider>
  );
}

export default MyApp;
