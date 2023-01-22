/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface OptionsProps {
  text: string;
  link: string;
  newTab?: string;
}

interface SubCategoryProps {
  name: string;
  id?: string;
  options: OptionsProps[];
}

interface ResourcesDDProps {
  category: string;
  subCategories: SubCategoryProps[][];
}

export default function ResourcesDD({
  category,
  subCategories,
}: ResourcesDDProps) {
  return (
    <Popover className="z-0">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto flex px-6">
            <Popover.Button
              className={classNames(
                open ? 'text-red' : 'text-white',
                'group bg-black rounded-md inline-flex items-center text-white font-medium hover:text-white focus:outline-none'
              )}
            >
              <span className="hover:text-red-bc2026 font-bebas italic text-xl tracking-wide">
                {category}
              </span>
            </Popover.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute transform shadow-lg w-full left-0">
              <div className="border-red-bc2026 border-t-2 mt-6">
                <div className={`w-full bg-black`}>
                  <div
                    className={`max-w-6xl mx-auto flex gap-10 flex-wrap pr-6 pl-6 pt-6 pb-6`}
                  >
                    {subCategories.map(([item]) => (
                      <a key={item.name}>
                        {item.name != 'Images' &&
                          <>
                            <h5 className="text-white cursor-pointer font-bebas italic text-2">
                            <Popover.Button className="text-white cursor-pointer font-bebas italic text-2">{item.name}</Popover.Button>
                            </h5>
                            {item.options.map((o, i) => {
                              return (
                                <div className="w-44 py-2" key={i}>
                                  <Link href={o.link} passHref>
                                    <a
                                      target={`${o.newTab}`}
                                      className="cursor-pointer font-roboto text-white text-sm  hover:text-red-bc2026"
                                    >
                                      <Popover.Button className="cursor-pointer font-roboto text-white text-sm  hover:text-red-bc2026">{o.text}</Popover.Button>
                                    </a>
                                  </Link>
                                </div>
                              );
                            })}
                          </>
                        }
                        {item.name == 'Images' &&
                          <>
                            <Image loader={()=>"/header/resources.jpg"} src="/header/resources.jpg" width={450} height={200} objectFit="cover" alt=""/>
                          </>
                        }
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
