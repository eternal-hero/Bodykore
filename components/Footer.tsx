/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { CategoryData } from '@utils/header';
import routes from '@config/routes';
import { useProductCompareBuilder } from '@lib/productCompareContext';
import Image from 'next/image';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styled from 'styled-components';
import { useSnackbar } from 'nextjs-toast';


const abouts = [
  { name: '#WeAreBodyKore', link: routes.about.path },
  { name: 'Inspiration', link: routes.portfolio.path },
  { name: 'Manuals', link: routes.manuals.path },
  { name: 'Loyalty Program', link: routes.loyaltyProgram.path },
  { name: 'Ambassador Program', link: routes.ambassadors.path },
  { name: 'Blog', link: routes.blog.path },
];
const supports = [
  { name: 'Store Locator', link: routes.stores.path },
  { name: 'Financing', link: routes.financing.path },
  { name: 'Tutorials', link: routes.videos.path },
  { name: 'Warranty', link: routes.warranty.path },
  { name: 'Returns Policy', link: routes.returnPolicy.path },
];

interface FooterParams {
  productCat: CategoryData[];
}

const Footer = ({ productCat }: FooterParams) => {
  const { productCompare, compareIds, deleteSingleProductCompare } =
    useProductCompareBuilder();
    const snackbar = useSnackbar()
  const [showCompare, setShowCompare] = useState(false);
  const handleSomething = () => {
    snackbar.showMessage(
      "Please add aleast 2 products to compare",
      "error",
      "filled",
    );
}
  return (
    <>
      {productCompare.length > 0 && (
        <BottomCompare showcompare={!showCompare}>
          <div
            className="topTrigger"
            onClick={() => setShowCompare(!showCompare)}
          >
            Click To {showCompare ? `Show` : `Hide`} Compareables
          </div>
          <div className="w-full justify-start lg:justify-between flex flex-row">
            {productCompare.map((ele, i) => {
              return (
                <CompareProductBox key={i} className="">
                  <ImageBox>
                    <Image
                      height={150}
                      width={150}
                      objectFit="contain"
                      src={ele.image}
                      alt=""
                      className="object-contain w-56"
                    />
                  </ImageBox>

                  <h4 className="text-black-373933 text-xl font-bebas font-bold italic text-left md:text-left">
                    {ele.title}
                  </h4>
                  <p className="font-bebas italic font-bold text-md text-black-373933 product-price affirmproduct">
                    $ {ele.price}
                  </p>
                  <button
                    onClick={() => deleteSingleProductCompare(ele.id)}
                    style={{ outline: 'none', margin: '0px' }}
                  >
                    <IoIosCloseCircleOutline size={30} />
                  </button>
                </CompareProductBox>
              );
            })}
            <div className="comparediv actionButton">
              {productCompare.length > 1 && (
                <Link href={`/compare?products=${compareIds}`}>Compare</Link>
              )}
              {productCompare.length <= 1 && <button onClick={handleSomething}>Compare</button>}
            </div>
          </div>
        </BottomCompare>
      )}
      <footer className="w-full h-fit bg-black pt-16 pb-5">
        <div className="flex flex-wrap max-w-7xl m-auto justify-start lg:justify-between">
          <div className="px-16">
            <img src="/svg/LogoFooter.svg" alt="" className="w-44" />
            <p className="text-gray-200 font-roboto pt-5">
              Global Leaders in Fitness Center Designs <br /> and Equipment
              Distribution.
            </p>
            <div className="flex items-center text-white font-roboto font-bold pt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g id="Phonecall" transform="translate(0 0)">
                  <rect
                    id="Rectángulo_7"
                    data-name="Rectángulo 7"
                    width="40"
                    height="40"
                    transform="translate(0 0)"
                    fill="#fff"
                    opacity="0"
                  />
                  <path
                    id="Icon_feather-phone-call"
                    data-name="Icon feather-phone-call"
                    d="M14.048,4.857A4.2,4.2,0,0,1,17.37,8.173M14.048,1.5a7.561,7.561,0,0,1,6.686,6.665m-.841,6.7v2.518a1.681,1.681,0,0,1-1.833,1.679A16.663,16.663,0,0,1,10.8,16.483a16.383,16.383,0,0,1-5.046-5.036A16.59,16.59,0,0,1,3.175,4.169a1.68,1.68,0,0,1,1.674-1.83H7.371A1.681,1.681,0,0,1,9.053,3.783a10.761,10.761,0,0,0,.589,2.359,1.676,1.676,0,0,1-.378,1.771L8.2,8.979a13.443,13.443,0,0,0,5.046,5.036l1.068-1.066a1.684,1.684,0,0,1,1.774-.378,10.815,10.815,0,0,0,2.363.588A1.68,1.68,0,0,1,19.893,14.863Z"
                    transform="translate(7.92 9.587)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </g>
              </svg>
              <h1 className="pl-4">949-325-3088</h1>
            </div>
            <div className="flex items-center text-gray-200 font-roboto">
              <svg
                id="Sales"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <rect
                  id="Rectángulo_7"
                  data-name="Rectángulo 7"
                  width="40"
                  height="40"
                  fill="#fff"
                  opacity="0"
                />
                <path
                  id="Icon_ionic-md-paper-plane"
                  data-name="Icon ionic-md-paper-plane"
                  d="M3.375,14.832l6.111,2.292.761,7.633,3.819-5.345,5.345,5.345L24.757,3.375Zm15.157,6.476-4.261-4.292,5.906-8.3L10.859,15.8,7.328,14.528,22.284,6.5Z"
                  transform="translate(5.625 5.625)"
                  fill="#fff"
                />
              </svg>
              <h5 className="pl-4">sales@bodykore.com</h5>
            </div>
            <div className="flex items-center text-gray-200 font-roboto lg:pt-2">
              <svg
                id="Clock"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <rect
                  id="Rectángulo_7"
                  data-name="Rectángulo 7"
                  width="40"
                  height="40"
                  fill="#fff"
                  opacity="0"
                />
                <g
                  id="Icon_feather-clock"
                  data-name="Icon feather-clock"
                  transform="translate(7 7)"
                >
                  <path
                    id="Trazado_8824"
                    data-name="Trazado 8824"
                    d="M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13Z"
                    transform="translate(0)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    id="Trazado_8825"
                    data-name="Trazado 8825"
                    d="M17.873,11,18,18l5.25,2.333"
                    transform="translate(-6.25 -3.333)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </svg>
              <h1 className="pl-4">
                MON-FRI (9AM-5PM PST) <br></br> Sat - Sun (Closed )
              </h1>
            </div>
          </div>

          {/*Categories Footer*/}
          <div className="flex flex-wrap justify-start lg:pt-0">
            <div className="px-16">
              <h1
                className="font-bebas italic text-2xl text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                Products
              </h1>
              {productCat.map((item, index) => (
                <Link
                  key={index}
                  href={`${routes.collection.path}/${item.slug}`}
                  passHref
                >
                  <span className="flex flex-wrap text-gray-200 font-roboto cursor-pointer py-1">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
            <div className="px-16">
              <h1
                className="font-bebas italic text-2xl text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                About
              </h1>
              {abouts.map((about, i) => (
                <Link key={i} href={about.link} passHref>
                  <h2 className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1">
                    {about.name}
                  </h2>
                </Link>
              ))}
            </div>
            <div className="px-16">
              <h1
                className="font-bebas italic text-2xl text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                Support
              </h1>
              {supports.map((support, i) => (
                <Link key={i} href={support.link} passHref>
                  <h2 className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1">
                    {support.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <section className="border-b border-gray-500 pt-0 lg:pt-5 xl:pt-10 "></section>

        <div className="flex lg:flex-row flex-wrap justify-center lg:justify-between py-8 max-w-8xl m-auto">
          <div className="lg:w-2/3 w-full flex justify-center">
            <div className="flex text-gray-200 text-center lg:text-left flex-wrap">
              <div>
                <h1 className="pr-2 text-sm tracking-wider">
                  ©2021 BodyKore -All rights reserved. -
                </h1>
              </div>
              <div className="hidden lg:block">
                <div className="flex ">
                  <Link href={'/terms-of-us'}>
                    <p className="underline cursor-pointer w-24 text-sm tracking-wider">
                      Terms of Use
                    </p>
                  </Link>
                  <p className="px-2 text-sm tracking-wider">|</p>
                  <Link href={'/privacy-policy'}>
                    <p className="underline cursor-pointer w-24 text-sm tracking-wider">
                      Privacy Policy
                    </p>
                  </Link>
                  <p className="px-2 text-sm tracking-wider">|</p>
                  <Link href={'/cookies-policy'}>
                    <p className="underline cursor-pointer w-28 text-sm tracking-wider">
                      Cookies Policy
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="block lg:hidden pb-5">
            <div className="flex text-gray-200 text-center lg:text-left">
              <Link href={'/terms-of-us'}>
                <p className="underline cursor-pointer w-24">Terms of Use</p>
              </Link>
              <p className="px-2">|</p>
              <Link href={'/privacy-policy'}>
                <p className="underline cursor-pointer w-24">Privacy Policy</p>
              </Link>
              <p className="px-2">|</p>
              <Link href={'/cookies-policy'}>
                <p className="underline cursor-pointer w-28">Cookies Policy</p>
              </Link>
            </div>
          </div>

          {/*Icons Social Media*/}
          <div className="lg:w-1/3 flex justify-end">
            <div className="flex">
              <div className="px-5">
                <Link href={'https://www.instagram.com/bodykore/'}>
                  <a target="_blank">
                    <img
                      src="/svg/instagram-footer.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>

              <div className="px-5">
                <Link href={'https://www.facebook.com/BodyKore/'}>
                  <a target="_blank">
                    <img
                      src="/svg/facebook-footer.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>

              <div className="px-5">
                <Link href={'https://twitter.com/bodykore'}>
                  <a target="_blank">
                    <img
                      src="/svg/twitter-footer.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>

              <div className="px-5">
                <Link href={'https://www.youtube.com/user/BodyKore'}>
                  <a target="_blank">
                    <img
                      src="/svg/youtube-footer.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


const ImageBox = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const BottomCompare = styled.div<{ showcompare: boolean }>`
  position: fixed;
  bottom: ${(p) => (p.showcompare ? `-20%` : `0`)};
  left: 0;
  right: 0;
  background: #efefef;
  padding: 0 10rem 10px;
  z-index: 999;
  transition: all 0.5s ease-in-out;
  .topTrigger {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
  }
 
  .actionButton {
    display: flex;
    align-items: center;
    flex-flow: row;
  }

  a,button {
    background: #000;
    color: #fff;
    min-height: 50px;
    border-radius: 10px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .comparediv {
    width: 25%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    img {
      margin: 10px 0;
    }
  }
`;

const CompareProductBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  button {
    position: absolute;
    right: 5px;
    color: red;
    width: 30px;
    background: transparent;
    
  }
`;