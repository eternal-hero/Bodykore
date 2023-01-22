/* eslint-disable @next/next/no-img-element */
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useProductCompareBuilder } from '@lib/productCompareContext';
import { mapCheckout } from '@utils/checkout';
import Cookies from 'js-cookie';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';
import TechnologyModal from './TechnologyModal';

export type ProductCompare = {
  id: string;
  image: string;
  title: string;
  price: string;
};

export type Technologies = {
  title: string;
  description: string;
  image: string;
  iconImage: string;
};

interface Option {
  title: string;
  id: string;
  price: string;
  prevPrice?: string;
  img?: string;
  available: boolean;
}

interface SingleProductProps {
  affirmMonthly?: string;
  affirmTax?: string;
  affirmLogo?: string;
  rating: number;
  numReviews: number;
  description?: string;
  shippingCost?: string;
  options: Option[];
  reviewOnClick: () => void;
  product: ProductCompare;
  technologies?: Technologies[];
}

const SingleProduct = ({
  shippingCost,
  options,
  reviewOnClick,
  product,
  technologies,
}: SingleProductProps) => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setcheckoutUrl = useSetRecoilState(checkoutUrlState);
  const setCartTotal = useSetRecoilState(cartTotalState);

  const [quantity, setQuantity] = useState(1);

  const [selected, setSelected] = useState(0);

  const multipleOptions = !(
    options.length === 1 && options[0].title === 'Default Title'
  );

  const addProduct = async () => {
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    let checkout;
    if (checkoutId !== undefined) {
      const res = await addItemToCheckout(
        checkoutId,
        options[selected].id,
        quantity
      );
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(options[selected].id, email, quantity);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
        Cookies.set('checkoutId', checkout.id, { expires: 90 });
      }
    }
    if (checkout !== undefined) {
      setCartItems(mapCheckout(checkout));
      setcheckoutUrl(checkout.webUrl);
      setCartTotal(checkout.subtotalPriceV2.amount);
    } else {
      console.error('Failed to add product');
    }
  };

 

  const [showModal, setShowModal] = useState({
    status: false,
    id: undefined as unknown as number,
  });

  const modalAction = (id: number, status: boolean) => {
    setShowModal({ status: status, id: id });
  };

  return (
    <section className="max-w-7xl m-auto">
      <div className="flex justify-between bg-gray-200 px-4 pt-4">
        <div className="flex items-center gap-4">
          <span className="font-bebas italic font-bold text-4xl text-black-373933 product-price affirmproduct">
            ${(+options[selected].price).toFixed(2)}
          </span>
          {options[selected].prevPrice !== undefined ? (
            <h1 className="font-roboto italic text-lg text-red-bc2026 line-through pr-4">
              ${(+(options[selected].prevPrice as string)).toFixed(2)}
            </h1>
          ) : null}
        </div>
      </div>

      {/* <p className="font-roboto text-xs text-black-373933">As low as</p> */}
      <div className="flex items-center gap-2 bg-gray-200 px-4 pb-4">
        {options[selected].price !== undefined ? (
          <p
            className="text-sm affirm-as-low-as text-black-500 underline-child-anchor"
            data-affirm-color="black"
            data-amount={(options[selected].price as unknown as number) * 100}
          >
            As low as with{' '}
            <span className="__affirm-logo __affirm-logo-black __ligature__affirm_full_logo__ __processed">
              Affirm
            </span>
            .{' '}
            <a
              className="affirm-modal-trigger"
              aria-label="Learn more about Affirm Financing (opens in modal)"
              href="javascript:void(0)"
            >
              Learn more
            </a>
          </p>
        ) : null}
      </div>

      {/* <p className="font-roboto text-sm">{description}</p> */}

      {multipleOptions ? (
        <div className="w-full py-4">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left text-gray-700 bg-gray-100 rounded-lg border border-red-bc2026 cursor-default focus:bg-white focus:border-gray-500">
                <span className="block truncate">
                  <div className="flex gap-8 items-center pl-3">
                    <img
                      src={options[selected].img}
                      alt=""
                      className="h-8 w-12"
                    />
                    {options[selected].title}
                  </div>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                        }`
                      }
                      value={index}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            <div className="flex items-center gap-8">
                              <img src={item.img} alt="" className="h-8 w-12" />
                              {item.title}
                            </div>
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      ) : null}

      {/* <p className="font-roboto text-sm">{shippingCost}</p> */}
      <div className="text-gray-700 relative bg-gray-200 px-5 border-t-8 border-white py-4">
        <p className="text-md">
          Qty : 
          <input
            className="w-20 text-gray-700 py-2 px-4 ml-2 leading-tight"
            type={'number'}
            min="1"
            step="1"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            defaultValue={quantity}
            onChange={(event) => {
              setQuantity(+event.target.value);
            }}
          ></input>
        </p>
        <button
        className={`w-full h-12 mt-6 border-2 border-black-373933 rounded-md font-bebas ${
          options[selected].available
            ? 'bg-black-373933 text-white'
            : 'cursor-default'
        }`}
        style={{ letterSpacing: '1.5px' }}
        onClick={addProduct}
        disabled={!options[selected].available}
      >
        <div className="flex justify-center items-center">
          <h1 className="mr-2">
            {options[selected].available ? 'ADD TO CART' : 'OUT OF STOCK'}
          </h1>
        </div>
      </button>
      </div>
      {/* <p className="text-grey-8C8C8C font-roboto text-xs pt-1">
        The final shipping cost will be apply in the check out page
      </p> */}

     

      <div className="w-full m-auto flex pt-4">
        <div className="w-full flex flex-nowrap">
          {technologies &&
            technologies.map((t, i) => {
              return (
                <div className="w-44 text-center" key={i}>
                  <Image
                    src={t.iconImage}
                    height={120}
                    width={120}
                    alt="image"
                    objectFit="contain"
                    onClick={() => modalAction(i, true)}
                    style={{ cursor: 'pointer' }}
                  />
                  <h3 className="text-xs">{t.title}</h3>
                  {i == showModal.id && (
                    <TechnologyModal
                      closeModal={() => modalAction(i, false)}
                      showModal={showModal.status}
                      technology={t}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
