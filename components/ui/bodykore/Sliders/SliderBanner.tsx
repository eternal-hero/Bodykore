import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';

interface BgImageProps {
  url?: string;
  title?: string;
  link?: string;
  subTitle?: string;
}

interface SliderPorgressProps {
  bgImage: BgImageProps[];
}

const SliderBanner = ({ bgImage }: SliderPorgressProps) => {
  const sliderRef = useRef<any>();

  return (
    <section>
      <div className="w-full">
        <Splide
          ref={sliderRef}
          options={{
            pagination: true,
            gap: '1rem',
            type: 'loop',
            width: '100%',
            autoWidth: false,
            autoplay: true,
          }}
          // renderControls={() => (
          //   <div className="flex justify-center pt-2 pb-2">
          //     <div className="slider-progress" style={{ width: '500px' }}>
          //       <div className="slider-progress-bar"></div>
          //     </div>
          //   </div>
          // )}
          // onMoved={(splide) => {
          //   // Update the bar width. CSS is found on components.css
          //   const end = splide.Components.Controller.getEnd() + 1;
          //   const bar =
          //     sliderRef.current.splideRef.current.getElementsByClassName(
          //       'slider-progress-bar'
          //     )[0];
          //   bar.style.width = String((100 * (splide.index + 1)) / end) + '%';
          // }}
        >
          {bgImage.map((b, i) => {
            return (
              <SplideSlide
                key={i}
                className="flex justify-center items-start splide__slide"
                data-splide-interval="9000"
              >
                {/* href={b.a} */}
                <a style={{width:"100%"}}>
                  <div
                    className={`bg-no-repeat bg-center object-contain cursor-pointer w-full`}
                    style={{
                      backgroundImage: `url('${b.url}')`,
                      height: 'calc(100vh - 110px)',
                      backgroundSize: 'cover',
                    }}
                  >
                    <div
                      className={`flex w-full justify-center items-center bg-black bg-opacity-25`}
                      style={{ height: 'calc(100vh - 110px)' }}
                    >
                     <div className='w-2/3 inline-block'>
                     <h3
                        className="cursor-pointer justify-start text-2xl lg:text-5xl tracking-widest font-bebas italic font-bold text-white"
                        style={{ letterSpacing: '1px' }}
                      >
                        {b.title}
                      </h3>
                      <p
                        className="cursor-pointer justify-start text-md lg:text-lg font-roboto bold italic text-white pb-3"
                        style={{ letterSpacing: '1px' }}
                      >
                        {b.subTitle}
                      </p>

                      <button className="w-40 h-12 text-white border border-white hover:text-white hover:bg-red-bc2026 hover:translate-x-8 hover:border-red-bc2026 rounded-lg font-roboto justify-start">
                        View More
                      </button>
                     </div>
                    </div>
                  </div>
                </a>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};

export default SliderBanner;
