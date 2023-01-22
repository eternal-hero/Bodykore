/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { EphemeralKeyInfo } from 'tls';

export interface CardsProps {
  title: string;
  phoneNumber: string;
  email: string;
  direction: string;
  distance?: number;
  latitude: number;
  longitude: number;
}
interface MapCardsProps {
  cards: CardsProps[];
  setter: (latitude: number, longitude: number) => void;
}

export default function MapCards({ cards, setter }: MapCardsProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        {cards.map((c, i) => {
          return c.distance && c.distance <= 300 ? (
            <div className="py-3" key={i}>
              <div className="flex flex-row pb-2 gap-20 lg:gap-0">
                <div className="w-2/3">
                  <h2 className="text-black-373933 text-2xl font-bebas font-bold italic text-left tracking-wide">
                    {c.title}
                  </h2>
                  <h6 className="text-black-373933 text-lg  tracking-normal font-bebas text-left">
                    {c.phoneNumber}
                  </h6>
                  <h6 className="text-black-373933 text-lg tracking-normal font-bebas text-left">
                    {c.email}
                  </h6>
                </div>
                <div className="justify-end w-1/3 lg:mr-20">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-6 border border-red-bc2026 text-red-bc2026 font-bold text-sm leading-tight rounded py-4"
                    onClick={() => {
                      setter(c.latitude, c.longitude);
                    }}
                  >
                    <img src="/svg/btnMarker.svg" alt="" />
                    DIRECTIONS
                  </button>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-2/3">
                  <h6 className="text-black-373933 text-lg  tracking-normal font-bebas text-left">
                    {c.direction}
                  </h6>
                </div>
                <div className="w-1/3 flex justify-end mr-28 pt-4">
                  <p className="font-roboto text-red-bc2026">
                    {c.distance !== undefined
                      ? c.distance?.toFixed(1) + ' mi'
                      : null}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            c.distance && c.distance > 500 && i == 0 && (
              <h2 key={i} className="text-black-373933 text-2xl font-bebas font-bold italic text-left tracking-wide">
                No Store found in your location
              </h2>
            )
          );
        })}
      </section>
    </>
  );
}
