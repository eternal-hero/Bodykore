import routes from '@config/routes';
import { NUM_SEARCH } from '@config/siteConfig';
import { Dialog, Transition } from '@headlessui/react';
import { imageNotFound } from '@utils/baseUrls';
import debounce from 'lodash.debounce';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchProducts } from 'services/shopify/storefront';
import { searchOpenState } from 'state/atoms';
import styled from 'styled-components';

interface SearchItem {
  name: string;
  link: string;
}

interface SearchModalParams {
  dynamicItems: SearchItem[];
}

export default function SearchModal({ dynamicItems }: SearchModalParams) {
  const [isOpen, setIsOpen] = useRecoilState(searchOpenState);
  const [products, setProducts] = useState<Item[]>([]);
  const [pages, setPages] = useState<Item[]>([]);

  async function closeModal() {
    await new Promise((r) => setTimeout(r, 200));
    setIsOpen(false);
    setProducts([]);
    setPages([]);
  }

  function openModal() {
    setIsOpen(true);
  }

  const searchContent = useRef(null);
  const searchInput = useRef(null);

  const iconOptions = {
    a: 'M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z',
    b: 'M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z',
  };

  const pageList: SearchItem[] = [];
  Object.keys(routes).forEach((key) => {
    const value = routes[key as keyof typeof routes] as {
      path: string;
      hidden?: boolean;
    };
    if (!value.hidden) {
      const name =
        key.charAt(0).toUpperCase() +
        key
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .slice(1);
      pageList.push({
        name: name,
        link: value.path,
      });
    }
  });
  pageList.push(...dynamicItems);

  const handleSearch = debounce(async (input: string) => {
    if (input.length == 0) {
      setProducts([]);
      setPages([]);
    }
    if (input.length > 2) {
      const produtResults = await searchProducts(NUM_SEARCH, input);
      setProducts(
        produtResults.map((item) => ({
          name: item.node.title,
          link: `${routes.products.path}/${item.node.handle}`,
          image: item.node.featuredImage != undefined ? item.node.featuredImage.url : imageNotFound,
        }))
      );
      setPages(
        pageList.filter((item) => item.name.toLowerCase().startsWith(input))
      );
    }
  }, 500);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75 overflow-hidden"
          onClose={closeModal}
        >
          <div
            className="px-4 text-center"
            onFocus={openModal}
            onBlur={closeModal}
          >
            {/* Dialog overlay */}
            {/* <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 overflow-hidden" />
            </Transition.Child> */}

            {/* Dialog content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg m-auto mt-12"
                ref={searchContent}
              >
                {/* Search form */}
                <form className="border-b border-gray-200">
                  <div className="relative">
                    <label htmlFor="modal-search" className="sr-only">
                      Search
                    </label>
                    <input
                      id="modal-search"
                      className="w-full border-0 placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
                      type="search"
                      placeholder="Search Anything…"
                      ref={searchInput}
                      onInput={(event) =>
                        handleSearch(
                          event.currentTarget.value.trim().toLowerCase()
                        )
                      }
                    />
                    <button
                      className="absolute inset-0 right-auto group"
                      type="submit"
                      aria-label="Search"
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-2"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="py-4 px-2">
                  {/* Products */}
                  <SearchItems
                    title="Products"
                    icon={iconOptions.b}
                    items={products}
                  />
                  {/* Pages */}
                  <SearchItems
                    title="Pages"
                    icon={iconOptions.a}
                    items={pages}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

interface Item {
  name: string;
  link: string;
  image?: string;
}

interface SearchItemsParams {
  title: string;
  icon: string;
  items: Item[];
}

function SearchItems({ title, icon, items }: SearchItemsParams) {
  const mapItems = () => {
    return items.map((item, index) => (
      <li key={index}>
        <a href={item.link}>
          <div
            // Changed on hover color as the background is also white
            className="flex items-center p-2 text-gray-800 hover:text-gray-500 hover:bg-blue-500 rounded group"
          >
            {title == 'Products' ? (
              <SearchImageBox>
                <Image
                  height={50}
                  width={50}
                  src={item.image!}
                  alt={item.name}
                />
              </SearchImageBox>
            ) : null}
            {title == 'Page' && (
              <svg
                className="w-4 h-4 fill-current text-gray-400 hover:text-gray-500 group-hover:text-opacity-50 flex-shrink-0 mr-3"
                viewBox="0 0 16 16"
              >
                <path d={icon} />
              </svg>
            )}
            <span>{item.name}</span>
          </div>
        </a>
      </li>
    ));
  };
  return (
    <div className="mb-3 last:mb-0">
      <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
        {title}
      </div>
      <ul className="text-sm">{mapItems()}</ul>
    </div>
  );
}

const SearchImageBox = styled.div`
  margin-right: 20px;
`;
