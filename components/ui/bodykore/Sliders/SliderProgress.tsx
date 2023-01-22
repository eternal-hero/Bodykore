import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';

interface BgImageProps {
  url?: string;
  title?: string;
  link?: string;
}

interface SliderPorgressProps {
  title1?: string;
  title2?: string;
  color1?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  bgImage: BgImageProps[];
  id?: string;
  link: string;
  gap?: string;
  width?: string;
  textPosition?: string;
  pb?: string;
}

const SliderProgress = ({
  title1,
  title2,
  color1,
  color2,
  description,
  btnText,
  bgImage,
  id,
  link,
  gap,
  width,
  textPosition,
  pb,
}: SliderPorgressProps) => {
  const sliderRef = useRef<any>();
  return (
    <section id={id}>
      <div
        className={`flex flex-row flex-wrap justify-center items-center max-w-7xl m-auto`}
      >
        <div className={`flex ${width} ${textPosition}`}>
          <span
            className={`${color2} text-2xl lg:text-5xl font-bebas font-bold italic`}
          >
            <span
              className={`${color1} text-2xl lg:text-5xl font-bebas font-bold italic pr-2`}
            >
              {title1}
            </span>
            {title2}
          </span>
        </div>
        <div className={`h-12 flex justify-end ${width}`}>
          {btnText !== undefined ? (
            <Link href={link || '#'} passHref>
              <button
                className="border uppercase border-black rounded-lg px-8 md:px-16 font-bebas font-bold text-black-373933 hover:border-red-bc2026 hover:text-red-bc2026"
                style={{ letterSpacing: '1.5px' }}
              >
                {btnText}
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <p
        className={`font-roboto text-black-1c2023 lg:w-2/3 text-center lg:text-left ${pb}`}
      >
        {description}
      </p>

      <div className="w-full max-w-7xl m-auto py-8">
        <Splide
          ref={sliderRef}
          options={{
            pagination: true,
            gap: '1rem',
            type: 'loop',
            width: '100%',
            autoWidth: false,
            autoplay: false,
          }}

        >
          {bgImage.map((b, i) => {
            return (
              <SplideSlide key={i} className="flex justify-center items-start">
                {b.link !== undefined ? (
                  <Link href={b.link} passHref={true}>
                    <div
                      className={`bg-no-repeat bg-center bg-cover cursor-pointer w-full`}
                      style={{
                        backgroundImage: `url('${b.url}')`,
                        height: '550px',
                      }}
                    >
                      <div
                        className={`flex justify-center items-end bg-black bg-opacity-25`}
                        style={{ height: '550px' }}
                      >
                        <h1
                          className="cursor-pointer w-5/6 text-4xl lg:text-5xl font-bebas italic font-bold absolute text-white pb-8 lg:pb-8 text-left"
                          style={{ letterSpacing: '1px' }}
                        >
                          {b.title}
                        </h1>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`bg-no-repeat bg-center bg-cover w-full lg:w-10/12`}
                    style={{
                      backgroundImage: `url('${b.url}')`,
                      height: '550px',
                    }}
                  >
                    <div
                      className={`flex justify-center items-end bg-black bg-opacity-25`}
                      style={{ height: '550px' }}
                    >
                      <h1
                        className="cursor-pointer w-4/6 text-4xl lg:text-5xl font-bebas italic font-bold absolute text-white pb-8 lg:pb-16 text-left"
                        style={{ letterSpacing: '1px' }}
                      >
                        {b.title}
                      </h1>
                    </div>
                  </div>
                )}
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};

export default SliderProgress;
