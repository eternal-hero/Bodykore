import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useRef } from 'react';
import { Richtext } from 'services/graphCMS';
import Blacktitle from '../Text/Titles/featurestitle';

interface ImageProps {
  title: string;
  subFeatures: ImageSubProps[];
}

interface ImageSubProps {
  img: string;
  title?: string;
  description?: string;
}

interface ImgDescriptionSinglePageProps {
  images: ImageProps[];
  imgHeight: string;
  imgWidth: string;
  textSize?: string;
}

export default function ImgDescriptionSinglePage({
  images,
  textSize,
}: ImgDescriptionSinglePageProps) {
  const sliderRef = useRef<any>();
  return (
    <>
      <section className="m-auto w-full">
        <div className="flex flex-wrap justify-center max-w-7xl">
          {images.map((img, i) => {
            return (
              <><Blacktitle
                title={img.title}
                textSize="text-4xl"
                textColor="text-black-373933"/>
                
                
                <Splide
                  key={i}
                  ref={sliderRef}
                  options={{
                    pagination: false,
                    gap: '1rem',
                    type: 'loop',
                    width: '100%',
                    autoWidth: false,
                    perPage: 3,
                    breakpoints: {
                      991: {
                        perPage: 1,
                      },
                    },
                    perMove: 1,
                  }}
                >

                  {img.subFeatures.map((ele, i) => {
                    return (
                      <SplideSlide key={i} className="flex">
                        <div className="" key={i}>
                          <div className="">
                            <div className="flex flex-wrap justify-center">
                              <div className="" key={i}>
                                <div className="flex justify-center w-full m-auto">
                                  <Image
                                    className={`h-56 w-full object-contain`}
                                    src={ele.img}
                                    alt=""
                                    height={300}
                                    width={400}
                                    objectFit="contain" />
                                </div>
                                <p
                                  className="text-md text-center font-roboto mt-2 tracking-normal font-bold text-gray-700">
                                  {ele.title}
                                </p>
                                {ele.description && (
                                  <p
                                    className={`${textSize} font-roboto text-black-1c2023 text-center`}
                                  >
                                    {ele.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </SplideSlide>
                    );
                  })}
                </Splide>
                
                </>
            );
          })}
        </div>
      </section>
    </>
  );
}
