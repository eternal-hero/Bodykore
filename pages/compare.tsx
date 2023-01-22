/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { getCompareProducts, ProductProps } from 'services/graphCMS';
import {
  getCompareProductsShopify,
  ShopifyCompareProduct,
} from 'services/shopify/storefront';
import { getStrapiCompareProduct, ProductStrapi } from 'services/strapi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const params: string[] | undefined = context.query.products?.toString().split(',');
  let compareProducts:ProductStrapi[] = [];
  if(params){
    compareProducts = await getStrapiCompareProduct(
      params[0],
      params[1],
      params[2]
    );
  }

  let handles = compareProducts.map((ele) => ele.attributes.handle);
  if (handles.length == 2) {
    handles = [...handles, 'a'];
  }
  if (handles.length == 1) {
    handles = [...handles, 'a', 'b'];
  }
  const compareShopifyProducts = await getCompareProductsShopify(
    // handles[0],handles[1],handles[3]
    handles[0],
    handles[1],
    handles[2]
  );

  // console.log(compareShopifyProducts)
  return {
    props: { header, compareProducts, compareShopifyProducts, params },
    // revalidate: 30 * 60,
  };
};

interface ComparePageParams {
  header: HeaderData;
  compareProducts: ProductStrapi[];
  compareShopifyProducts: ShopifyCompareProduct;
  params: String[];
}

const ComparePage = ({
  header,
  compareProducts,
  compareShopifyProducts,
  params,
}: ComparePageParams) => {
  return (
    <>
      <SeoHeader seo={seo.return_policy} />

      {/* <Header productCat={header.categories} dynamicPages={header.pages} /> */}
      <main className="w-full">
        <section className="pb-36">
          <div className="h-4 bg-red-bc2026"></div>
          <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic pt-28 px-16 max-w-8xl m-auto">
            <h1 className="text-black-373933 tracking-wider">
              Equipment COMPARISON
            </h1>
          </div>
          <div className="px-16 mt-5 max-w-8xl m-auto">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full border text-left">
                      <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                          ></th>
                          {params.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                              >
                                {i == 0 && (
                                  <>
                                    <img
                                      src={
                                        compareShopifyProducts.product1
                                          .featuredImage.url
                                      }
                                      width={'400px'}
                                      alt=""
                                    />
                                    <h3 className="font-bebas italic text-2xl pt-2">
                                      {compareShopifyProducts.product1.title}
                                    </h3>
                                    <span className="text-lg font-bold">
                                      $
                                      {
                                        compareShopifyProducts.product1
                                          .priceRange.minVariantPrice.amount
                                      }
                                    </span>
                                  </>
                                )}
                                {i == 1 && (
                                  <>
                                    <img
                                      src={
                                        compareShopifyProducts.product2
                                          .featuredImage.url
                                      }
                                      width={'400px'}
                                      alt=""
                                    />
                                    <h3 className="font-bebas italic text-2xl pt-2">
                                      {compareShopifyProducts.product2.title}
                                    </h3>
                                    <span className="text-lg font-bold">
                                      $
                                      {
                                        compareShopifyProducts.product2
                                          .priceRange.minVariantPrice.amount
                                      }
                                    </span>
                                  </>
                                )}
                                {i == 2 && (
                                  <>
                                    <img
                                      src={
                                        compareShopifyProducts.product3
                                          .featuredImage.url
                                      }
                                      width={'400px'}
                                      alt=""
                                    />
                                    <h3 className="font-bebas italic text-2xl pt-2">
                                      {compareShopifyProducts.product3.title}
                                    </h3>
                                    <span className="text-lg font-bold">
                                      $
                                      {
                                        compareShopifyProducts.product3
                                          .priceRange.minVariantPrice.amount
                                      }
                                    </span>
                                  </>
                                )}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <thead className="border-b bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="text-2xl font-bebas italic tracking-wide font-bold text-gray-900 px-6 py-4 border-r"
                          >
                            All Specs
                          </th>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                              ></th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Dimensions
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.dimensions}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Weight
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.weight}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Footprint
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.footprint}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Frame
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.frame}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Frame Color
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.frameColor}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Weight Stack
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.weightStack}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            ofAdjustableHeightPositions
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {
                                  ele.attributes.specification
                                    .ofAdjustableHeightPositions
                                }
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            ofWeightPegs
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.ofWeightPegs}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            counterBalancedSmithMachine
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {
                                  ele.attributes.specification
                                    .counterBalancedSmithMachine
                                }
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            halfRackFunction
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.halfRackFunction}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            dualPulleySystem
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.dualPulleySystem}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            accessoryStorage
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.accessoryStorage}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            multiGripPullUpHandles
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {
                                  ele.attributes.specification
                                    .multiGripPullUpHandles
                                }
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            barStorage
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.barStorage}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            bodyGroupTarget
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.bodyGroupTarget}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            assemblyTime
                          </td>
                          {compareProducts.map((ele, i) => {
                            return (
                              <th
                                key={i}
                                scope="col"
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                              >
                                {ele.attributes.specification.assemblyTime}
                              </th>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer productCat={header.categories} /> */}
    </>
  );
};

export default ComparePage;
