import routes from '@config/routes';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { mapCheckout } from '@utils/checkout';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  addItemToCheckout, createCheckout
} from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';

interface SliderCardProps {
  id: string;
  slug: string;
  title: string;
  price: string;
  affirmPrice?: string;
  affirmIcon?: string;
  url?: string;
  available: boolean;
  options: String[];
}

interface CatPackagesSection2Props {
  title1?: string;
  color1?: string;
  title2?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  btnBorder?: string;
  border?: string;
  style?: string;
  link?: string;
  cards: SliderCardProps[];
}

const CatPackagesSection2 = ({
  title1,
  color1,
  title2,
  color2,
  description,
  btnText,
  btnBorder,
  border,
  style,
  link,
  cards,
}: CatPackagesSection2Props) => {
  const sliderRef = useRef<any>();
  const [slideBgColor, setSlideBgColor] = useState(0.5);
  const setCartItems = useSetRecoilState(cartItemsState);
  const setcheckoutUrl = useSetRecoilState(checkoutUrlState);
  const setCartTotal = useSetRecoilState(cartTotalState);

  const animateSlide = (bgColor: number) => {
    switch (style) {
      case 'zoom':
        setSlideBgColor(bgColor);
        break;
    }
  };

  const addProduct = async (id: string) => {
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    let checkout;
    if (checkoutId !== undefined) {
      const res = await addItemToCheckout(checkoutId, id);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(id, email);
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

  return (
    <section className="w-full max-w-7xl m-auto px-6">
      <div className="lg:flex lg:flex-row pb-2">
        <div className="lg:flex lg:w-2/4 text-center lg:text-left">
          <span
            className={`${color2} text-4xl xl:text-5xl font-bebas font-bold italic`}
          >
            <span
              className={`${color1} text-4xl xl:text-5xl font-bebas font-bold italic pr-2`}
            >
              {title1}
            </span>
            {title2}
          </span>
        </div>
        <div className="flex justify-center lg:justify-end lg:w-2/4 py-8 lg:py-0">
          <Link href={link || '#'} passHref>
            <button
              className={`w-52 h-12 mb-2 bg-transparent text-black-373933 ${border} ${btnBorder} hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg font-bebas`}
              style={{ letterSpacing: '1px' }}
            >
              <h1 className="font-bold">{btnText}</h1>
            </button>
          </Link>
        </div>
      </div>
      <p className="font-roboto text-black-1c2023 lg:w-2/3 pb-8 text-center lg:text-left">
        {description}
      </p>

      <Splide
        ref={sliderRef}
        options={{
          pagination: false,
          gap: '1rem',
          type: 'loop',
          width: '100%',
          autoWidth: false,
          perPage: 3,
          perMove: 1,
        }}
        onMoved={(splide) => {
          // Update the bar width. CSS is found on components.css
          const end = splide.Components.Controller.getEnd() + 1;
        }}
      >
        {cards.map((item, index) => {
          return (
            <SplideSlide key={index}>
              <div className="flex items-center">
                <div className="w-full" />
                <Link href={`${routes.products.path}/${item.slug}`} passHref>
                  <img src={item.url} alt="" className="cursor-pointer" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-between py-2">
                <h1
                  className="text-2xl font-bebas text-black-1c2023"
                  style={{ letterSpacing: '0.5px' }}
                >
                  {item.title}
                </h1>
                <h1 className="font-bebas text-red-bc2026 text-2xl lg:text-4xl font-bold italic pr-2">
                  ${item.price}
                </h1>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className={`w-56 h-10 mb-2 bg-transparent ${border} ${btnBorder} rounded-md font-bebas ${
                    item.available
                      ? 'bg-black-373933 text-white'
                      : 'cursor-default'
                  }`}
                  style={{ letterSpacing: '1px' }}
                  onClick={() => {
                    addProduct(item.id);
                  }}
                  disabled={!item.available}
                >
                  <div className="flex items-center justify-center gap-2">
                    {item.available ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.193"
                        height="16.193"
                        viewBox="0 0 16.193 16.193"
                      >
                        <path
                          id="Icon_material-add-shopping-cart"
                          data-name="Icon material-add-shopping-cart"
                          d="M9.532,7.669h1.606V5.355h2.41V3.813h-2.41V1.5H9.532V3.813H7.122V5.355h2.41Zm-3.213,6.94A1.543,1.543,0,1,0,7.926,16.15,1.573,1.573,0,0,0,6.319,14.608Zm8.032,0a1.543,1.543,0,1,0,1.606,1.542A1.573,1.573,0,0,0,14.351,14.608ZM6.456,12.1l.024-.093L7.2,10.753h5.984a1.61,1.61,0,0,0,1.406-.794l3.1-5.405-1.4-.74h-.008L15.4,5.355,13.187,9.211H7.548L7.444,9l-1.8-3.647L4.881,3.813,4.126,2.271H1.5V3.813H3.106L6,9.666,4.914,11.555a1.445,1.445,0,0,0-.2.74,1.58,1.58,0,0,0,1.606,1.542h9.638V12.3h-9.3A.2.2,0,0,1,6.456,12.1Z"
                          transform="translate(-1.5 -1.5)"
                          fill="#fff"
                        />
                      </svg>
                    ) : null}
                    {item.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                  </div>
                </button>
                <div className="shadow-lg border border-gray-100 bg-white h-10 w-36">
                  <p className="text-xxs pl-2">As low as</p>
                  <div className="flex items-end justify-center gap-1">
                    <h1
                      className="font-bebas text-xl font-bold"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      {item.affirmPrice}
                    </h1>
                    <img
                      src={item.affirmIcon}
                      alt=""
                      style={{ height: '22px', width: '44px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-8">
                {item.options.map((o, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-center py-5">
                        <p className="font-roboto text-black-1c2023 text-sm lg:text-base">
                          {o}
                        </p>
                      </div>
                      <div className="border-b border-gray-400"></div>
                    </div>
                  );
                })}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default CatPackagesSection2;
