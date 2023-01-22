interface FadingAndInfoProps {
  title?: string;
  description?: string;
  icon?: string;
  btnText?: string;
  bgImage?: string;
  heightbg?: string;
  heightGradient?: string;
  link?: string;
}

export default function FadingAndInfo({
  title,
  description,
  icon,
  btnText,
  bgImage,
  heightbg,
  heightGradient,
  link,
}: FadingAndInfoProps) {
  return (
    <>
      {/*Main Image*/}
      <div
        className={`bg-no-repeat w-full bg-center bg-cover ${bgImage}`}
        style={{ height: `${heightbg}` }}
      >
        <div
          className={`bg-gradient-to-r from-black via-black to-transparent w-full flex items-center`}
          style={{ height: `${heightGradient}` }}
        >
          <div className="flex flex-row max-w-7xl m-auto">
            <div className="text-white md:w-1/2">
              <h1
                className="font-bebas text-5xl font-bold italic px-20 text-center md:text-left"
                style={{ letterSpacing: '2px' }}
              >
                {title}
              </h1>
              <p className="font-roboto pt-2 px-20 text-center md:text-left">
                {description}
              </p>
              <div className="flex justify-center md:justify-start">
                <a href={link}>
                  <button className="flex gap-2 text-xs text-white border border-white rounded-lg px-8 py-2 mx-20 mt-5">
                    <img src={icon} alt="" />
                    {btnText}
                  </button>
                </a>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
        <div className="h-4 bg-red-bc2026"></div>
      </div>
    </>
  );
}
