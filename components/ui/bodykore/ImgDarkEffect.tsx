import routes from '@config/routes';
import Image from 'next/image';

interface ImageProps {
  image: string;
  slug: string;
}

interface ButtonProps {
  text: string;
  color: string;
}

interface ImgDarkEffectProps {
  title1: string;
  title2: string;
  title3: string;
  buttonsText: ButtonProps;
  images: ImageProps[];
}

export default function ImgDarkEffect({
  title1,
  title2,
  buttonsText,
  images,
}: ImgDarkEffectProps) {
  return (
    <>
      <section className='relative'>
        <div className="flex justify-center lg:justify-start py-6 max-w-7xl m-auto lg:pl-16">
          <h1 className="text-red-bc2026 text-5xl font-bebas font-bold italic">
            {title1}
          </h1>
          <h1 className="text-black-373933 text-5xl pl-2 font-bebas font-bold italic">
            {title2}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-20">
          {images.map((img, i) => {
            return img.image ? (
              <div key={i} className='bg-black hover:bg-opacity-0 transition duration-500'>
                <a href={`${routes.portfolio.path}/${img.slug}`}>
                  <img src={img.image} alt="" className='h-80 w-80 object-cover' />
                </a>
              </div>
            ) : null;
          })}
        </div>
        <div className="flex justify-center">
          <a href={routes.portfolio.path}>
            <button
              className={
                'mt-16 lg:mt-16 mb-44 bg-transparent text-black-373933 hover:text-red-bc2026 py-3 px-16 border-2 border-black-373933 hover:border-red-bc2026 rounded-lg text-lg font-bold font-bebas'
              }
              style={{ letterSpacing: '2px' }}
            >
              {buttonsText.text}
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
