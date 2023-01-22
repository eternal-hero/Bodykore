import { mapCheckout } from '@utils/checkout';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import {
  removeItemFromCheckout, updateQuantityCheckout
} from 'services/shopify/storefront';
import { cartItemsState, cartTotalState } from 'state/atoms';

export interface SingleItemCartProps {
  available: boolean;
  shippingDays?: number;
  name: string;
  option?: string;
  price: number;
  amount: number;
  image?: string;
  lineId: string;
  cartId: string;
}
// Changed option to indicate selected variant.
// Changed amount to indicate quantity in the cart,
// change the selector UI to a number input.

export default function SingleCartItem({
  available,
  shippingDays,
  name,
  option,
  price,
  amount,
  image,
  lineId,
  cartId,
}: SingleItemCartProps) {
  const setCartItems = useSetRecoilState(cartItemsState);
  const setCartTotal = useSetRecoilState(cartTotalState);

  const removeLine = async () => {
    const res = await removeItemFromCheckout(cartId, lineId);
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
    }
  };

  const updateLine = async (quantity: number) => {
    if (quantity === 0) {
      // Dont allow 0 to avoid accidental removal,
      // as the item would disapear from the cart
      return;
    }
    const res = await updateQuantityCheckout(cartId, lineId, quantity);
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
    }
  };
  return (
    <>
      

 <div className="unbundledItems">
        <div className="border-b border-gray-200">
          <div className="flex transition-opacity opacity-100">
            <div>
              {/* <Link href={`${routes.products.path}/${handle}`}> */}
                <span className="cursor-pointer box-border inline-block overflow-hidden w-20 h-28 bg-none opacity-100 border-0 m-0 p-0 relative">
                  {image ? (
                    <Image
                      src={image}
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  ) : null}
                </span>
              {/* </Link> */}
            </div>
            <div className="flex flex-col grow pl-3 space-y-2 items-start">
              <div>
                {/* <Link
                 href={`${routes.products.path}/${handle}`}
                 
                > */}
                 <p className="font-bold font-bebas italic tracking-wide text-lg cursor-pointer"> {name}</p>
                {/* </Link> */}
              </div>
              <div className="text-gray-700">
                {available ? '' : ''}
                <p>In Stock</p>
              </div>
              <div className="text-gray-700 relative">
                <p className="text-xs">
                  Quantity
                  <input
                    className="w-20 text-gray-700 py-1 px-4 pr-4 leading-tight"
                    type={'number'}
                    min="1"
                    step="1"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    defaultValue={amount}
                    onChange={(event) => {
                      updateLine(+event.target.value);
                    }}
                  ></input>
                </p>
              </div>
            </div>
            <div className="pl-2 flex flex-col justify-between items-end">
              <button
                type="button" onClick={removeLine}
                className="font-semibold uppercase !p-0 text-gray-700 text-black-500 hover:text-black-700 focus:shadow-none px-4 py-2 text-xs inline-block select-none leading-none tracking-wide whitespace-nowrap transition-colors duration-300 cursor-pointer"
              >
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="currentColor"
                  className="!p-0 text-gray-700 fill-current"
                  width="20px"
                  height="20px"
                >
                  <title>Close</title>
                  <path d="M13.56 12.5l6-5.95a.75.75 0 10-1.06-1.06l-6 5.95-5.95-5.95a.75.75 0 10-1.06 1.06l5.95 6-5.95 5.9a.75.75 0 000 1.06.75.75 0 001.06 0l6-6 5.95 6a.75.75 0 001.06 0 .75.75 0 000-1.06z"></path>
                </svg>
              </button>
              <div className="flex justify-end items-center">
                <div className="text-base text-black-500">
                  ${price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
