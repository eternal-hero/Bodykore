/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { CategoryData } from '@utils/header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DynamicPages } from 'services/graphCMS';
import {
  getCheckout,
  updateCheckoutEmail,
} from 'services/shopify/storefront';
import {
  cartItemsState,
  cartSidebarOpenState,
  cartTotalState,
  checkoutUrlState,
  menuSidebarOpenState,
  searchOpenState,
} from '../state/atoms';
import MobileMenu from './MobileMenu';
import CartSidebar from './CartSidebar';
import ProductsDD from './ui/bodykore/Dropdown/ProductsDD';
import ResourcesDD from './ui/bodykore/Dropdown/ResourcesDD';
import SearchModal from './ui/bodykore/SearchModal';
import { CardProps } from './ui/bodykore/Cards/SellCardsaddon';

const categories = [
  { name: 'Inspiration', link: routes.portfolio.path },
  {
    name: 'Dealers',
    subCategories: [
      { name: 'Dealer Location', link: routes.stores.path, blank: '' },
      {
        name: 'Dealer Login',
        link: 'https://dealerportal.bodykore.com/login',
        blank: '_blank',
      },
    ],
  },
  { name: 'Contact', link: routes.contact.path },
];

interface HeaderParams {
  productCat: CategoryData[];
  dynamicPages: DynamicPages;
  cartsAddon: CardProps[];
}

const Header = ({ productCat, dynamicPages, cartsAddon }: HeaderParams) => {
  const setMenuSidebarOpen = useSetRecoilState(menuSidebarOpenState);
  const setCartSidebarOpen = useSetRecoilState(cartSidebarOpenState);
  const setSearchOpen = useSetRecoilState(searchOpenState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [checkoutUrl, setcheckoutUrl] = useRecoilState(checkoutUrlState);
  const [cartTotal, setCartTotal] = useRecoilState(cartTotalState);
  const [dropdown, setDropdown] = useState(false);

  const dropDownAct = () => {
    setDropdown(!dropdown);
  };

  const fetchCart = async () => {
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    if (checkoutId !== undefined) {
      const checkout = await getCheckout(checkoutId);
      if (checkout !== undefined) {
        setCartItems(mapCheckout(checkout));
        setcheckoutUrl(checkout.webUrl);
        setCartTotal(checkout.subtotalPriceV2.amount);
        if (email && checkout.email !== email) {
          await updateCheckoutEmail(checkoutId, email);
        }
      } else {
        Cookies.remove('checkoutId');
      }
    }
  };

  useEffect(() => {
    fetchCart();
  });

  const mapDynamicSearch = () => {
    const collections = productCat.map((item) => ({
      name: `${item.title} (Collection)`,
      link: `${routes.collection.path}/${item.slug}`,
    }));
    const projects = dynamicPages.projects.map((item) => ({
      name: `${item.title} (Portfolio)`,
      link: `${routes.portfolio.path}/${item.slug}`,
    }));
    const articles = dynamicPages.articles.map((item) => ({
      name: `${item.title} (Blog)`,
      link: `${routes.blog.path}/${item.slug}`,
    }));
    return [...collections, ...projects, ...articles];
  };

  const handleSearch = async (product: string) => {};

  return (
    /*Nav section*/
    <nav className="sticky top-0 z-50">
      {/*Ad bar section*/}
      <div className="bg-black border-b border-black-1c2023 text-center">
        <div className="flex max-w-8xl m-auto justify-end pi-1">
          <div className="cursor-pointer" onClick={() => setSearchOpen(true)}>
            <svg
              className=""
              id="Search"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="40"
              viewBox="0 0 40 40"
              fill="#fff"
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
                id="Icon_awesome-search"
                data-name="Icon awesome-search"
                d="M19.728,17.294,15.833,13.4a.937.937,0,0,0-.664-.273h-.637a8.122,8.122,0,1,0-1.406,1.406v.637a.937.937,0,0,0,.273.664l3.895,3.895a.934.934,0,0,0,1.324,0l1.106-1.106A.942.942,0,0,0,19.728,17.294Zm-11.6-4.168a5,5,0,1,1,5-5A5,5,0,0,1,8.126,13.126Z"
                transform="translate(10.5 9.5)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>

      {/*Navigation section*/}
      <div className="w-full bg-black sticky top-0">
        <div className="px-8 bg-black max-w-8xl m-auto">
          {/* Cart Sidebar */}
          <CartSidebar
            items={cartItems}
            checkoutUrl={checkoutUrl}
            cartTotal={cartTotal}
            bestSeller={cartsAddon}
          />

          <div className="flex flex-row">
            {/*BodyKore Logo*/}
            <div className="w-1/5 flex justify-start items-center xl:pl-16">
              <div className="hidden xl:block">
                <a href="https://bodykore.com/">
                  <img
                    src="/header/logowhitered.png"
                    alt="BodyKore Logo"
                    className="cursor-pointer"
                    style={{ maxWidth: '170px' }}
                  />
                </a>
              </div>
            </div>

            {/*Categories*/}
            <div className="w-3/5 flex justify-end items-center font-bebas text-xl tracking-wide">
              <div className="hidden xl:block">
                <div className="flex">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <ProductsDD
                        category="Products"
                        subCategories={productCat.map((category) => ({
                          name: category.title, //.split(',')[1]
                          img: category.image,
                          slug: `${routes.collection.path}/${category.slug}`,
                          options: category.subcategories.map((subcat) => {
                            // if (category.slug === 'packages') {
                            //   return {
                            //     text: subcat.name,
                            //     slug: `${routes.products.path}/${subcat.slug}`,
                            //   };
                            // }
                            return {
                              text: subcat.name,
                              slug: `${routes.products.path}?category=${category.title}`,
                            };
                          }),
                        }))}
                      />
                    </div>
                    <div className="hidden flex-1 xl:block">
                      <ResourcesDD
                        category="Resources"
                        subCategories={[
                          [
                            {
                              name: 'INFORMATIONAL',
                              options: [
                                {
                                  text: '#WeAreBodyKore',
                                  link: routes.about.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Ambassador Program',
                                  link: routes.ambassadors.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Loyalty Program',
                                  link: routes.loyaltyProgram.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Manuals',
                                  link: routes.manuals.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Videos',
                                  link: routes.videos.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Blog',
                                  link: routes.blog.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Technology',
                                  link: routes.technology.path,
                                  newTab: '_self',
                                },
                              ],
                            },
                          ],
                          [
                            {
                              name: 'ORDER SUPPORT',
                              options: [
                                {
                                  text: 'Full Gym Solutions',
                                  link: routes.gymSolutions.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Financing',
                                  link: routes.financing.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'My Account',
                                  link: '/auth/signin',
                                  newTab: '_self',
                                },
                                {
                                  text: 'Warranty Registration',
                                  link: routes.warranty.path,
                                  newTab: '_self',
                                },
                                {
                                  text: 'Return Policy',
                                  link: routes.returnPolicy.path,
                                  newTab: '_self',
                                },
                              ],
                            },
                          ],
                          [
                            {
                              name: 'CATALOGS',
                              options: [
                                {
                                  text: 'Equipment Catalog',
                                  link: '/PDFs/Equipment-Catalog.pdf',
                                  newTab: '_blank',
                                },
                                {
                                  text: 'Product Catalog',
                                  link: '/PDFs/Product-Catalog.pdf',
                                  newTab: '_blank',
                                },
                                {
                                  text: 'HomeGym Catalog',
                                  link: '/PDFs/Home-Gyms-Catalog.pdf',
                                  newTab: '_blank',
                                },
                              ],
                            },
                          ],
                          [
                            {
                              name: 'Images',
                              options: [
                                {
                                  text: 'Equipment Catalog',
                                  link: '/PDFs/Equipment-Catalog.pdf',
                                  newTab: '_blank',
                                },
                                {
                                  text: 'Product Catalog',
                                  link: '/PDFs/Product-Catalog.pdf',
                                  newTab: '_blank',
                                },
                                {
                                  text: 'HomeGym Catalog',
                                  link: '/PDFs/Home-Gyms-Catalog.pdf',
                                  newTab: '_blank',
                                },
                              ],
                            },
                          ],
                        ]}
                      />
                    </div>
                  </div>
                  <div className="hidden flex-1 xl:block my-7 max-w-lg italic">
                    <div className="relative w-full flex gap-6">
                      {categories.map((category, i) => (
                        <a key={i}>
                          {category.link && (
                            <Link href={category.link} passHref>
                              <span
                                className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                              >
                                {category.name}
                              </span>
                            </Link>
                          )}
                          {!category.link && (
                            <div>
                              <span
                                className="text-white cursor-pointer hover:text-red-bc2026 text-center "
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={dropDownAct}
                              >
                                {category.name}
                              </span>
                              {dropdown && category.subCategories && (
                                <ul className="flex flex-col absolute top-8 bg-black w-2/3 text-lg">
                                  {category.subCategories.map((subcat, i) => (
                                    <li
                                      key={i}
                                      className=" py-2 pl-6"
                                      onClick={dropDownAct}
                                    >
                                      {subcat.blank != '' && (
                                        <a
                                          href={subcat.link}
                                          target={subcat.blank}
                                        >
                                          <span
                                            className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true"
                                          >
                                            {subcat.name}
                                          </span>
                                        </a>
                                      )}
                                      {subcat.blank == '' && (
                                        <a>
                                          <Link href={subcat.link} passHref>
                                            <span
                                              className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                                              id="menu-button"
                                              aria-expanded="true"
                                              aria-haspopup="true"
                                            >
                                              {subcat.name}
                                            </span>
                                          </Link>
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Iconos*/}
            <div className="w-1/5 flex justify-end items-center">
              <div className="hidden xl:flex flex-1 gap-2 justify-end">
                <div className="flex justify-end gap-3 my-5 items-center">
                  <Link
                    href={
                      'https://' +
                      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN +
                      '/account'
                    }
                    passHref
                  >
                    <div className="cursor-pointer">
                      <svg
                        className="mb-0.5"
                        id="MYACCOUNT"
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="40"
                        fill="#fff"
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
                          id="Icon_material-person-outline"
                          data-name="Icon material-person-outline"
                          d="M15.545,8.267a2.506,2.506,0,1,1-2.506,2.506,2.505,2.505,0,0,1,2.506-2.506m0,10.739c3.544,0,7.278,1.742,7.278,2.506v1.313H8.267V21.511c0-.764,3.735-2.506,7.278-2.506M15.545,6a4.773,4.773,0,1,0,4.773,4.773A4.771,4.771,0,0,0,15.545,6Zm0,10.739C12.36,16.739,6,18.338,6,21.511v3.58H25.091v-3.58C25.091,18.338,18.731,16.739,15.545,16.739Z"
                          transform="translate(4.833 4.833)"
                        />
                      </svg>
                    </div>
                  </Link>

                  <div onClick={() => setCartSidebarOpen(true)}>
                    <svg
                      className="cursor-pointer"
                      id="Cart"
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="#fff"
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
                        id="Icon_material-add-shopping-cart"
                        data-name="Icon material-add-shopping-cart"
                        d="M11.421,9.119H13.4V6.262h2.976v-1.9H13.4V1.5H11.421V4.357H8.444v1.9h2.976ZM7.452,17.69a1.906,1.906,0,1,0,1.984,1.9A1.943,1.943,0,0,0,7.452,17.69Zm9.921,0a1.906,1.906,0,1,0,1.984,1.9A1.943,1.943,0,0,0,17.373,17.69ZM7.621,14.6l.03-.114.893-1.552h7.391a1.989,1.989,0,0,0,1.736-.981L21.5,5.271l-1.726-.914h-.01l-1.091,1.9-2.738,4.762H8.97l-.129-.257-2.222-4.5-.942-1.9-.933-1.9H1.5v1.9H3.484l3.571,7.229L5.716,13.919a1.784,1.784,0,0,0-.248.914,1.951,1.951,0,0,0,1.984,1.9h11.9v-1.9H7.869A.247.247,0,0,1,7.621,14.6Z"
                        transform="translate(8.5 8.5)"
                      />
                      <g id="numero" transform="translate(25)">
                        <circle
                          id="Elipse_1"
                          data-name="Elipse 1"
                          cx="8"
                          cy="8"
                          r="8"
                          fill="#d33500"
                        />
                        <text
                          id="_1"
                          data-name="1"
                          transform="translate(6 10)"
                          fill="#fff"
                          fontSize="10"
                          fontFamily="AcuminProExtraCond-Black, Acumin Pro ExtraCondensed"
                          fontWeight="600"
                        >
                          <tspan x="0" y="0">
                            {cartItems.length}
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="ml-4">
                    <Link href={'tel:949-325-3088'}>
                      <button
                        className="bg-transparent text-white hover:text-white border border-white hover:border-white rounded-lg text-md px-3 py-2"
                        style={{ letterSpacing: '1.5px' }}
                      >
                        <div className="flex justify-center items-center">
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

                          <div className="px-2 text-sm font-medium">
                            Call us
                          </div>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/3 flex justify-start items-center">
              {/*3 bars Menu*/}
              <div
                className="flex items-center pl-2 xl:hidden cursor-pointer"
                onClick={() => setMenuSidebarOpen(true)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 158 158"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M131.996 72.4166H26.0042C22.5501 72.4166 19.75 75.2167 19.75 78.6708V79.3291C19.75 82.7832 22.5501 85.5833 26.0042 85.5833H131.996C135.45 85.5833 138.25 82.7832 138.25 79.3291V78.6708C138.25 75.2167 135.45 72.4166 131.996 72.4166Z"
                    fill="white"
                  />
                  <path
                    d="M131.996 105.333H26.0042C22.5501 105.333 19.75 108.133 19.75 111.588V112.246C19.75 115.7 22.5501 118.5 26.0042 118.5H131.996C135.45 118.5 138.25 115.7 138.25 112.246V111.588C138.25 108.133 135.45 105.333 131.996 105.333Z"
                    fill="white"
                  />
                  <path
                    d="M131.996 39.5H26.0042C22.5501 39.5 19.75 42.3001 19.75 45.7542V46.4125C19.75 49.8666 22.5501 52.6667 26.0042 52.6667H131.996C135.45 52.6667 138.25 49.8666 138.25 46.4125V45.7542C138.25 42.3001 135.45 39.5 131.996 39.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Search Modal */}
            <SearchModal dynamicItems={mapDynamicSearch()} />
            {/* Menu Sidebar */}
            <MobileMenu
              search={handleSearch}
              categories={[
                {
                  title: 'Products',
                  icon: '/svg/black-arrow.svg',
                },
                {
                  title: 'Resources',
                  icon: '/svg/black-arrow.svg',
                },
              ]}
              links={[
                {
                  title: 'Inspiration',
                  href: routes.portfolio.path,
                },
                {
                  title: 'Stores',
                  href: routes.stores.path,
                },
              ]}
              linksImg={[
                {
                  title: 'Cart',
                  icon: '/svg/header-cart.svg',
                  href: '#',
                },
                {
                  title: 'Account',
                  icon: '/svg/my-account.svg',
                  href: routes.account.path,
                },
              ]}
              categories1={productCat}
            />

            <div className="w-1/3 flex justify-center items-center">
              <div className="xl:hidden">
                <Link href="/" passHref>
                  <img
                    src="/header/logowhitered.png"
                    alt="BodyKore Logo"
                    className="cursor-pointer"
                    style={{ maxWidth: '170px', height: 'auto' }}
                  />
                </Link>
              </div>
            </div>

            <div className="w-1/3 flex justify-end items-center">
              {/*Shopping cart sm*/}
              <div
                className="my-7 md:block lg:block xl:hidden"
                onClick={() => setCartSidebarOpen(true)}
              >
                <svg
                  id="Cart"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#fff"
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
                    id="Icon_material-add-shopping-cart"
                    data-name="Icon material-add-shopping-cart"
                    d="M11.421,9.119H13.4V6.262h2.976v-1.9H13.4V1.5H11.421V4.357H8.444v1.9h2.976ZM7.452,17.69a1.906,1.906,0,1,0,1.984,1.9A1.943,1.943,0,0,0,7.452,17.69Zm9.921,0a1.906,1.906,0,1,0,1.984,1.9A1.943,1.943,0,0,0,17.373,17.69ZM7.621,14.6l.03-.114.893-1.552h7.391a1.989,1.989,0,0,0,1.736-.981L21.5,5.271l-1.726-.914h-.01l-1.091,1.9-2.738,4.762H8.97l-.129-.257-2.222-4.5-.942-1.9-.933-1.9H1.5v1.9H3.484l3.571,7.229L5.716,13.919a1.784,1.784,0,0,0-.248.914,1.951,1.951,0,0,0,1.984,1.9h11.9v-1.9H7.869A.247.247,0,0,1,7.621,14.6Z"
                    transform="translate(8.5 8.5)"
                  />
                  <g id="numero" transform="translate(28)">
                    <circle
                      id="Elipse_1"
                      data-name="Elipse 1"
                      cx="6"
                      cy="6"
                      r="6"
                      fill="#d33500"
                    />
                    <text
                      id="_1"
                      data-name="1"
                      transform="translate(5 8)"
                      fill="#fff"
                      fontSize="7"
                      fontFamily="AcuminProExtraCond-Black, Acumin Pro ExtraCondensed"
                      fontWeight="800"
                    >
                      <tspan x="0" y="0">
                        {cartItems.length}
                      </tspan>
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Ad bar section*/}
      <div className="w-full h-auto bg-red text-center py-2 px-4">
        <span className="text-white font-bebas italic tracking-wider text-xl">
          FLEXIBLE FINANCING AVAILABLE.
        </span>
        <span className="text-white font-bebas italic text-sm tracking-wider">
          LEARN MORE
        </span>
      </div>
    </nav>
  );
};

export default Header;
