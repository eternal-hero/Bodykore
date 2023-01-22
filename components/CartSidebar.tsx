import { Dialog, Transition } from '@headlessui/react';
import {
  XIcon
} from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getShopifyCollectionQuery, ShopifyProductQuery } from 'services/shopify/storefront';
import { cartSidebarOpenState } from '../state/atoms';
import SellCards, { CardProps } from './ui/bodykore/Cards/SellCardsaddon';
import SingleCartItem, {
  SingleItemCartProps
} from './ui/bodykore/Cart/SingleCartItem';

interface CartSidebarProps {
  items: SingleItemCartProps[];
  checkoutUrl?: string;
  cartTotal?: string;
  bestSeller?: CardProps[] | undefined;
}


const CartSidebar = ({ items, checkoutUrl, cartTotal, bestSeller }: CartSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(cartSidebarOpenState);


  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-50 flex-row-reverse"
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
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-md w-full bg-white-f2f9fa">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 left-0 -ml-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-8 pb-4 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex-shrink-0 flex justify-center items-center px-4">
                  <h1 className='text-2xl font-bebas font-bold italic text-black-373933' style={{ letterSpacing: '1px' }}>Cart</h1>
                </div>
                <nav className="mt-5 px-2 space-y-1 flex flex-col gap-4">
                  {items.map((item, i) => {
                    return (
                      <div className="flex flex-col gap-4" key={i}>
                        <hr />
                        <SingleCartItem
                          name={item.name}
                          amount={item.amount}
                          available={item.available}
                          option={item.option}
                          price={item.price}
                          image={item.image}
                          lineId={item.lineId}
                          cartId={item.cartId}
                        />
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/*Total*/}
              <div>
                <div className='border-b border-gray-400 mx-8'></div>
                <div className='flex justify-between px-8 py-5'>
                  <h5 className='text-2xl font-bebas font-bold italic text-black-373933' style={{ letterSpacing: '1px' }}>SUBTOTAL</h5>
                  <h5 className='text-2xl font-bebas font-bold italic text-red-bc2026' style={{ letterSpacing: '1px' }}>${cartTotal || "0"}</h5>
                </div>
                <div className='border-b border-gray-400 mx-8'></div>
              </div>

              {/*Checkout*/}
              <div className="bg-black-373933 uppercase rounded-lg text-white text-center px-8 py-4 mx-2">
                <a className="font-bold" href={checkoutUrl}>
                  Checkout
                </a>
              </div>
              {bestSeller != undefined && <SellCards cards={bestSeller != undefined ? bestSeller : undefined} />}
              {/*Affirm section*/}
              <div>
                <div className='flex justify-center items-center'>
                  {/* <h1 className='font-roboto text-black-373933'> <span className='font-bold'>Pay over the time</span> with</h1>
                  <img src="/Product/affirm.jpg" alt="" /> */}
                  <a className="affirm-site-modal" data-page-type="banner" style={{ cursor: 'pointer' }} aria-label="<img class=&quot;affirmlog&quot; src=&quot;https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.svg&quot;>- Affirm Financing (opens in modal)">
                    <img className="affirmlog" src="https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.svg" />
                  </a>
                </div>
                {/* <div className='flex justify-center'>
                  <h1 className='font-roboto text-black-373933 text-sm'>As low as <span className='font-bold'>$30/mo</span> or <span className='font-bold'>0%</span> APR</h1>
                </div> */}
              </div>

            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-16">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSidebar;
