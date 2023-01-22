import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { menuSidebarOpenState } from '../state/atoms';
import { FormEventHandler, useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { CategoryData } from '@utils/header';
import routes from '@config/routes';
import Image from 'next/image';

interface CategoriesProps {
  title: string;
  icon: string;
}

interface Categories1Props {
  title: string;
  icon: string;
}

interface LinksProps {
  title: string;
  href: string;
}

interface LinksImgProps {
  title: string;
  icon?: string;
  href: string;
}

interface SearchFormProps {
  search: (value: string) => void;
  categories: CategoriesProps[];
  categories1: CategoryData[];
  links: LinksProps[];
  linksImg: LinksImgProps[];
}

interface SubCategory {
  title: string;
  slug: string;
  subCategories: ThirdCategory[];
}

interface ThirdCategory {
  name: string;
  slug: string;
  type: string;
}

export default function MobileMenu({
  search,
  categories,
  categories1,
  links,
  linksImg
}: SearchFormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const term = event.currentTarget.search.value;
    search(term);
  };
  const [sidebarOpen, setSidebarOpen] = useRecoilState(menuSidebarOpenState);

  let productCatsInit: Array<SubCategory> = [];
  let thirdCatInit: Array<ThirdCategory> = [];
  
  const [mainShow, setMainShow] = useState(true);
  const [secondMenu, setSecondMenu] = useState(false);
  const [thirdMenu, setThirdMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(productCatsInit);
  const [subSubMenu, setSubsubMenu] = useState(thirdCatInit);

  let productCats: Array<SubCategory> = [];
  categories1.map((ele) => {
    let thirdCat: Array<ThirdCategory> = [];
    ele.subcategories.map((el) => {
      return thirdCat.push({
        name: el.name,
        slug:
          ele.slug != 'packages'
            ? `/products?category=${ele.title}`
            : `/products/${el.slug}`,
        type: 'menu',
      });
    });
    productCats.push({
      title: ele.title,
      subCategories: thirdCat,
      slug:
        ele.slug != 'packages'
          ?  `/product-category/${ele.slug}`
          : `/product-category/${ele.slug}`,
    });
  });

  const menus = [
    {
      icon: '',
      name: 'Products',
      subCategories: productCats,
      slug: '',
    },
    {
      icon: '',
      name: 'Resources',
      slug: '',
      subCategories: [
        {
          title: 'INFORMATIONAL',
          slug: '',
          subCategories: [
            {
              name: '#WeAreBodyKore',
              slug: routes.about.path,
              type: 'menu',
            },
            {
              name: 'Ambassador Program',
              slug: routes.ambassadors.path,
              type: 'menu',
            },
            {
              name: 'Loyalty Program',
              slug: routes.loyaltyProgram.path,
              type: 'menu',
            },
            {
              name: 'Manuals',
              slug: routes.manuals.path,
              type: 'menu',
            },
            {
              name: 'Videos',
              slug: routes.videos.path,
              type: 'menu',
            },
            {
              name: 'Blog',
              slug: routes.blog.path,
              type: 'menu',
            },
          ],
        },

        {
          title: 'ORDER SUPPORT',
          slug: '',
          subCategories: [
            {
              name: 'Full Gym Solutions',
              slug: routes.gymSolutions.path,
              type: 'menu',
            },
            {
              name: 'Financing',
              slug: routes.financing.path,
              type: 'menu',
            },
            {
              name: 'My Account',
              slug: '/auth/signin',
              type: 'menu',
            },
            {
              name: 'Warranty Registration',
              slug: routes.warranty.path,
              type: 'menu',
            },
            {
              name: 'Return Policy',
              slug: routes.returnPolicy.path,
              type: 'menu',
            },
          ],
        },

        {
          title: 'CATALOGS',
          slug: '',
          subCategories: [
            {
              name: 'Equipment Catalog',
              slug: '/PDFs/Equipment-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'Product Catalog',
              slug: '/PDFs/Product-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'HomeGym Catalog',
              slug: '/PDFs/Home-Gyms-Catalog.pdf',
              type: 'menu',
            },
          ],
        },

        {
          title: 'Images',
          slug: '',
          subCategories: [
            {
              name: 'Equipment Catalog',
              slug: '/PDFs/Equipment-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'Product Catalog',
              slug: '/PDFs/Product-Catalog.pdf',
              type: 'menu',
            },
            {
              name: 'HomeGym Catalog',
              slug: '/PDFs/Home-Gyms-Catalog.pdf',
              type: 'menu',
            },
          ],
        },
      ],
    },
    {
      icon: '',
      slug: '/portfolio',
      name: 'Inspiration',
      subCategories: [],
    },
    {
      icon: '',
      slug: '',
      name: 'Dealers',
      subCategories: [
        {
          title: 'Dealer Location',
          slug: '/storeLocator',
          subCategories: [],
        },
        {
          title: 'Dealer Login',
          slug: 'https://dealerportal.bodykore.com/login',
          subCategories: [],
        },
      ],
    },
    {
      icon: '/svg/header-cart.svg',
      name: 'Cart',
      slug: '#',
      subCategories: [],
    },
    {
      icon: '/svg/my-account.svg',
      name: 'Account',
      slug: 'https://bodykore-store.myshopify.com/password',
      subCategories: [],
    },
  ];
  const mainMenuAct = () => {
    setMainShow(true);
    setSecondMenu(false);
    setThirdMenu(false);
  };

  const secondMenuAct = () => {
    setMainShow(false);
    setSecondMenu(true);
    setThirdMenu(false);
  };
  const thirdMenuAct = () => {
    setMainShow(false);
    setSecondMenu(false);
    setThirdMenu(true);
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-50 xl:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-sm w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                  onClick={() => {
                    setSidebarOpen(false);
                    mainMenuAct();
                  }}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 pb-4">
                <img
                  className="h-auto w-auto"
                  style={{ maxWidth: '180px' }}
                  src="/header/logo.png"
                  alt="Logo BodyKore"
                />
              </div>

              <div className="h-3 bg-red-bc2026"></div>

              {/* MobileMenu 0 */}
              {mainShow ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group relative flex items-stretch w-full mb-4 rounded px-8 pt-5">
                      <input
                        id="search"
                        type="text"
                        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Search..."
                        required={true}
                      ></input>
                      <button
                        type="submit"
                        className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
                        id="basic-addon2"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="search"
                          className="w-4"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </form>

                  <nav className="mt-5 space-y-1 px-4">
                    {menus.map((item, i) => (
                      <div key={i}>
                        {item.slug == '' && (
                          <a
                            onClick={() => {
                              secondMenuAct();
                              setSubMenu(item.subCategories);
                            }}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center w-full">
                                {item.icon != '' && (
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="h-8 w-8 mr-3"
                                  />
                                )}
                                {item.name}
                              </div>
                              {item.subCategories.length > 0 && (
                                <img
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                />
                              )}
                            </div>
                          </a>
                        )}
                        {item.slug != '' && (
                          <a
                            href={item.slug}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center w-full">
                                {item.icon != '' && (
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="h-8 w-8 mr-3"
                                  />
                                )}
                                {item.name}
                              </div>
                            </div>
                          </a>
                        )}
                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </nav>

                  <div className="flex justify-center pt-10">
                    <button
                      className="bg-transparent text-black hover:text-red-bc2026 border border-black hover:border-red rounded-lg text-md px-16 py-2"
                      style={{ letterSpacing: '1.5px' }}
                    >
                      <div className="flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div className="px-2 text-sm font-medium">Call us</div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* MobileMenu 1 */}
              {secondMenu ? (
                <nav className="mt-5 space-y-1 px-4">
                  <>
                    <span
                      className="flex cursor-pointer"
                      onClick={() => {
                        mainMenuAct();
                      }}
                    >
                      <img
                        src="/svg/black-arrow-reverse.svg"
                        alt=""
                        className="h-5 w-5"
                      />
                      <strong className="-mt-1 ml-2">Go Back</strong>
                    </span>
                    {subMenu.map((item, i) => (
                      <div key={i}>
                        {item.slug == '' && (
                          <a
                            onClick={() => {
                              thirdMenuAct();
                              setSubsubMenu(item.subCategories);
                            }}
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            {item.title != 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                {item.title}
                                <img
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                />
                              </div>
                            )}
                            {item.title == 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <Image
                                  loader={() => '/header/resources.jpg'}
                                  src="/header/resources.jpg"
                                  width={450}
                                  height={200}
                                  objectFit="cover"
                                  alt=""
                                />
                              </div>
                            )}
                          </a>
                        )}

                        {item.slug != '' && (
                          <a
                            className={
                              'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                            }
                          >
                            {item.title != 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <a href={item.slug}>{item.title}</a>
                                <img
                                  src="/svg/black-arrow.svg"
                                  alt=""
                                  className="h-5 w-5"
                                  onClick={() => {
                                    thirdMenuAct();
                                    setSubsubMenu(item.subCategories);
                                  }}
                                />
                              </div>
                            )}
                            {item.title == 'Images' && (
                              <div className="flex justify-between items-center w-full">
                                <Image
                                  loader={() => '/header/resources.jpg'}
                                  src="/header/resources.jpg"
                                  width={450}
                                  height={200}
                                  objectFit="cover"
                                  alt=""
                                />
                              </div>
                            )}
                          </a>
                        )}

                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </>
                </nav>
              ) : null}
              {thirdMenu ? (
                <nav className="mt-5 space-y-1 px-4">
                  <>
                    <span
                      className="flex cursor-pointer"
                      onClick={() => {
                        secondMenuAct();
                      }}
                    >
                      <img
                        src="/svg/black-arrow-reverse.svg"
                        alt=""
                        className="h-5 w-5"
                      />
                      <strong className="-mt-1 ml-2">Go Back</strong>
                    </span>
                    {subSubMenu.map((item, i) => (
                      <div key={i}>
                        <a
                          href={item.slug}
                          className={
                            'group flex items-center px-2 py-2 text-base font-medium hover:text-red-bc2026 rounded-md'
                          }
                        >
                          <div className="flex justify-between items-center w-full">
                            {item.name}
                            <img
                              src="/svg/black-arrow.svg"
                              alt=""
                              className="h-5 w-5 "
                            />
                          </div>
                        </a>
                        <div className="border-t border-gray-300 mt-2"></div>
                      </div>
                    ))}
                  </>
                </nav>
              ) : null}
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
