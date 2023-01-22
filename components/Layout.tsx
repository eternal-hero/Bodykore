import routes from '@config/routes';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getProjectsOfCategoryHome, ProjectCategoryHome } from 'services/graphCMS';
import { getShopifyCollectionQuery, ShopifyProductQuery } from 'services/shopify/storefront';
import { Header } from '.';
import { Footer } from '.';
import { CardProps } from './ui/bodykore/Cards/SellCardsaddon';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const projects = await getProjectsOfCategoryHome();

  return {
    props: { header, projects },
    //// revalidate: 30 * 60,
  };
};


export interface LayoutProps {
  children: React.ReactNode,
  header?: HeaderData,
}

const Layout = ({ children, header }: LayoutProps) => {
  return <>
    {header  && <Header productCat={header.categories} dynamicPages={header.pages} cartsAddon={header.cartsAddon} />}
    {children}
    {header && <Footer productCat={header.categories} />}
  </>;
};

export default Layout;