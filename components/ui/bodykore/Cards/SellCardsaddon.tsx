import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { initWishlist, updateWishlist } from '@utils/wishlist';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export interface CardProps {
  id: string;
  slug: string;
  bgImg?: string;
  title: string;
  price: string;
  comparePrice?: string;
  description?: string;
  available: boolean;
}

interface SellCardsProps {
  title?: string;
  gap?: string;
  cards?: CardProps[] | undefined;
}
export default function SellCards({
  title,
  gap,
  cards,
}: SellCardsProps) {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setcheckoutUrl = useSetRecoilState(checkoutUrlState);
  const setCartTotal = useSetRecoilState(cartTotalState);

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

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const fetchWishlist = async () => {
    setWishlist(await initWishlist());
  };

  useEffect(() => {
    // Cookies.set('customerId', '6154246979804', {expires: 90})
    fetchWishlist();
  }, []);

  const sliderRef = useRef<any>();

  return (
    <>
      <div className="w-full m-auto">
        <div className={`px-5 pb-5 pt-10`}>
          <h3 className='text-2xl font-bebas font-bold italic text-black-373933 tracking-wider'>You may also like</h3>
          <Splide
            ref={sliderRef}
            options={{
              pagination: true,
              gap: '1rem',
              type: 'loop',
              width: '100%',
              autoWidth: false,
              autoplay: true,
            }}>
            {cards && cards.map((item, index) => {
              return (
                <SplideSlide
                  key={index}
                  className="flex justify-center items-start splide__slide"
                  data-splide-interval="9000"
                >
                  <div key={index} className="my-2">
                    <div
                      className="border"
                      style={{ height: '200px', width: '100%' }}
                    >

                      <div
                        className={`flex bg-no-repeat bg-center bg-cover relative w-full align-middle`}
                      >
                        <a href={`${routes.products.path}/${item.slug}`} className='relative h-32 w-32 mx-3'>
                          {item.bgImg !== undefined ? (
                            <Image
                              src={item.bgImg}
                              layout="fill"
                              objectFit="contain"
                              objectPosition="absolute"
                            />
                          ) : null}
                          {item.comparePrice !== undefined ? (
                            <div className="flex justify-center items-center bg-red-bc2026 w-32 h-8 z-10 absolute">
                              <h1 className="font-bebas text-white">
                                DROPPED PRICE
                              </h1>
                            </div>
                          ) : null}
                          <div />
                        </a>
                        <h3 className="text-black-1c2023 font-roboto flex flex-col font-bold pt-5 w-full">
                          <span className='pr-2 block'>{item.title}</span>
                          <span className="font-roboto text-red-bc2026 line-through pr-4">
                            {item.comparePrice !== undefined
                              ? `$${item.comparePrice}`
                              : null}
                          </span>
                          <span className="font-roboto text-2xl text-black-373933">
                            ${item.price}
                          </span>
                        </h3>

                      </div>

                      <div className="px-3">

                        <button
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-black  hover:-translate-x-10 rounded-md font-bebas ${item.available
                            ? 'bg-black-373933 text-white'
                            : 'cursor-default'
                            }`}
                          style={{ letterSpacing: '1.5px' }}
                          onClick={() => {
                            addProduct(item.id);
                          }}
                          disabled={!item.available}
                        >
                          <div className="flex justify-between px-16 items-center">
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
                            <h5 className="w-full">
                              {item.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </h5>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </div>
    </>
  );
}
