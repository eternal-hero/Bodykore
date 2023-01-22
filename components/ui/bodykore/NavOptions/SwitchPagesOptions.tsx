import Link from 'next/link';

export interface OptionProps {
  icon?: string;
  arrow?: string;
  text?: string;
  link?: string;
}

interface SwitchPagesOptionsProps {
  options: OptionProps[];
}

export default function SwitchPagesOptions({
  options,
}: SwitchPagesOptionsProps) {
  return (
    <>
      {/*Main Image*/}
      <div className="flex max-w-7xl m-auto">
        {options.map((o, i) => {
          return (
            <div key={i} className="flex items-center gap-2">
              <img src={o.icon} alt="" />
              <Link href={o.link || '#'} passHref>
                <h1 className="cursor-pointer text-sm text-black-373933 font-roboto">
                  {o.text}
                </h1>
              </Link>
              <img src={o.arrow} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
}
