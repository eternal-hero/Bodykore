import routes from '@config/routes';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { mapCheckout } from '@utils/checkout';
import { initWishlist, updateWishlist } from '@utils/wishlist';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';

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

interface SellCardsSingleProps {
  title?: string;
  gap?: string;
  cards: CardProps[];
}
export default function SellCardsSingle({
  title,
  gap,
  cards,
}: SellCardsSingleProps) {
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
      <div className="max-w-7xl m-auto">
        <h3
          className="flex justify-center lg:justify-start font-bebas italic font-bold text-5xl text-black-373933"
          style={{ letterSpacing: '1px' }}
        >
          {title}
        </h3>
        <div className={`flex flex-wrap justify-start ${gap}`}>
          <Splide
            ref={sliderRef}
            options={{
              pagination: false,
              gap: '1rem',
              type: 'loop',
              width: '100%',
              autoWidth: false,
              autoplay: true,
              
              perPage: 4,
              perMove: 1,
            }}>
            {cards.map((item, index) => {
              return (
                <SplideSlide
                  key={index}
                  className="flex justify-center items-start splide__slide"
                  data-splide-interval="9000"
                >
                  <div key={index} className="px-8 lg:px-0">
                    <div
                      className="shadow-lg bg-white"
                      style={{ height: '385px', width: '280px' }}
                    >
                      <div
                        className={`flex justify-between bg-no-repeat bg-center h-48 bg-cover relative`}
                      >
                        <a href={`${routes.products.path}/${item.slug}`} className='relative h-full w-full'>
                          {item.bgImg !== undefined ? (
                            <Image
                              src={item.bgImg}
                              layout="fill"
                              objectFit="cover"
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
                        <div className="z-10 absolute right-0">
                          <svg
                            id="Componente_152_2"
                            data-name="Componente 152 – 2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="35"
                            viewBox="0 0 32 35"
                            onClick={(event) => {
                              const add = !wishlist.has(item.slug);
                              if (add) {
                                wishlist.add(item.slug);
                              } else {
                                wishlist.delete(item.slug);
                              }
                              updateWishlist(wishlist);
                              event.currentTarget
                                .querySelector('path')
                                ?.setAttribute(
                                  'fill',
                                  add ? 'crimson' : 'none'
                                );
                            }}
                            className="cursor-pointer"
                          >
                            <rect
                              id="Rectángulo_7"
                              data-name="Rectángulo 7"
                              width="32"
                              height="35"
                              fill="#fff"
                              opacity="0"
                            />
                            <path
                              id="Icon_feather-heart"
                              data-name="Icon feather-heart"
                              d="M16.685,5.8a3.862,3.862,0,0,0-5.792,0l-.789.86L9.315,5.8a3.862,3.862,0,0,0-5.792,0,4.748,4.748,0,0,0,0,6.31l.789.86,5.792,6.31,5.792-6.31.789-.86a4.747,4.747,0,0,0,0-6.31Z"
                              transform="translate(6.512 6.133)"
                              fill={wishlist.has(item.slug) ? 'crimson' : 'none'}
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="px-3">
                        <div className="flex items-center h-20">
                          <div>
                            <h3 className="text-black-1c2023 font-roboto font-bold pt-5 w-32">
                              {item.title.length >= 30 ? item.title.slice(0,30)+'...' : item.title}
                            </h3>
                          </div>
                          <div className="flex justify-center items-center shadow-lg bg-white h-9 w-32 mt-6">
                            <span className="font-bebas italic font-bold text-red-bc2026 line-through pr-4">
                              {item.comparePrice !== undefined
                                ? `$${item.comparePrice}`
                                : null}
                            </span>
                            <span className="font-bebas italic font-bold text-2xl text-black-373933">
                              ${item.price}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-base mb-4 h-10 flex items-center">
                          {item.description}
                        </p>
                        <button
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-black hover:-translate-x-10 rounded-md font-bebas ${item.available
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
