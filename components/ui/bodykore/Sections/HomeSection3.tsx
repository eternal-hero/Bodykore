import React, { useEffect, useRef, useState } from 'react';

interface AccordionProps {
  question: string;
  answer: string;
  type?: string;
}

interface HomeSection3Props {
  title1: string;
  title2: string;
  accordion: AccordionProps[];
  filter: string[];
}

export default function HomeSection3({
  title1,
  title2,
  accordion,
  filter,
}: HomeSection3Props) {
  const [active, setActive] = useState(-1);
  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('transform duration-700 ease');

  const contentSpace = useRef<HTMLDivElement>(null);

  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  useEffect(() => {
    if (contentSpace && contentSpace.current) {
      setHeight(`${contentSpace.current.scrollHeight}px`);
      setRotate(
        active
          ? 'transform duration-700 ease'
          : 'transform duration-700 ease rotate-180'
      );
    }
  }, [active]);

  const mapDisplayed = () => {
    return accordion.filter((item) => item.type === type);
  };

  const [type, setType] = useState(filter[0]);
  const [displayed, setDisplayed] = useState(mapDisplayed());

  useEffect(() => {
    setDisplayed(mapDisplayed());
  }, [type]);

  return (
    <>
      <section className="w-full max-w-7xl m-auto">
        <div className="flex flex-row justify-center">
          <div className="lg:w-1/4 pt-16 hidden lg:block">
            <div className="mt-8 pl-24">
              <div
                className="mt-1 space-y-1"
                aria-labelledby="projects-headline"
              >
                {filter.map((item) => (
                  <h1
                    key={item}
                    className={`group flex items-center px-3 py-1 font-bebas ${
                      item === type ? 'text-red-bc2026' : 'text-black-373933'
                    } cursor-pointer`}
                    style={{ letterSpacing: '1px' }}
                    onClick={() => {
                      setType(item);
                    }}
                  >
                    <span className="truncate">{item}</span>
                  </h1>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 lg:pr-24">
            <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic xs:pt-24 max-w-7xl m-auto">
              <h1 className="text-black-373933 pr-2">{title1}</h1>
              <h1 className=" text-red-bc2026 pr-1">{title2}</h1>
            </div>

            <div className="lg:hidden">
              <div className="my-2">
                <div
                  className="mt-1 flex flex-wrap justify-center"
                  aria-labelledby="projects-headline"
                >
                  {filter.map((item) => (
                    <h1
                      key={item}
                      className="group flex items-center px-3 py-1 font-bebas text-black-373933 cursor-pointer"
                      style={{ letterSpacing: '1px' }}
                      onClick={() => {
                        setType(item);
                      }}
                    >
                      <span>{item}</span>
                    </h1>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 lg:px-0 pt-8 lg:pt-0">
              {displayed.map((a, i) => {
                return (
                  <div className="flex flex-col" key={i}>
                    <button
                      className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          onClick={() => toggleAccordion(i)}
                          src={`${
                            active === i ? '/svg/substraction.svg' : '/svg/sum.svg'
                          }`}
                          height="30px"
                          alt=""
                        />
                        <p className="inline-block text-footnote light font-bebas text-2xl text-black-373933 text-left">
                          {a.question}
                        </p>
                      </div>
                    </button>
                    <div
                      ref={contentSpace}
                      style={{ height: `${active === i ? "100%" : '0px'}` }}
                      className="overflow-auto transition-height duration-700 ease-in-out faqs-container"
                    >
                     
                      <div className="pl-8 pb-4" dangerouslySetInnerHTML={{__html: a.answer}} />
                    </div>
                    <div className="border-b border-gray-200"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
