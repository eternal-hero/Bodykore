import Link from 'next/link';

interface HalfBannerParams {
  title: string;
  description?: string;
  bgImage?: string;
  buttonsText?: {
    text: string;
    color: string;
    link?: string;
  }[];
  width?: string;
}

export default function MainBanner({
  title,
  description,
  buttonsText = [],
  bgImage,
  width,
}: HalfBannerParams) {
  const scrollDown = () => {
    const element = document.getElementById('belowBanner');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/*Main Image*/}
      <div
        className={`bg-no-repeat h-80 w-full bg-center bg-cover flex justify-center items-center`}
        style={{
          backgroundImage: `linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 80%)), url('${bgImage}'`,
        }}
      >
        <div className="text-center =text-white max-w-7xl m-auto">
          {/*Title*/}
          <div className="flex flex-wrap justify-center items-center">
            <h3
              className={`lg:text-main-banner-title text-6xl ${width} italic font-bebas font-bold`}
              style={{ letterSpacing: '4px' }}
            >
              {title}
            </h3>
          </div>
          {/*Description*/}
          <div className="flex justify-center">
            <p className="w-3/5 pt-2 font-roboto">{description}</p>
          </div>
          {/*Button*/}
          <div className="flex flex-wrap gap-4 justify-center font-bebas font-bold px-32 pt-16 lg:pt-10">
            {buttonsText.map((b, i) => {
              return (
                <Link key={i} href={b.link || '#'} passHref>
                  <button
                    key={i}
                    className={` ${
                      b.color === 'transparent'
                        ? 'bg-transparent hover:bg-white text-white hover:text-black'
                        : 'bg-white hover:bg-transparent text-black hover:text-white'
                    } py-3 w-52 border-2 border-white hover:border-transparent rounded-lg text-md`}
                    style={{ letterSpacing: '1.5px' }}
                  >
                    {b.text}
                  </button>
                </Link>
              );
            })}
          </div>
          {/*Arrow*/}
          <div className="animate-bounce flex justify-center mt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              onClick={() => scrollDown()}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
