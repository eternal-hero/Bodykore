import routes from '@config/routes';
import Image from 'next/image';

interface CardsProps {
  img?: string;
  topic?: string;
  date?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  slug: string;
}
interface BlogCardsProps {
  mainTitle?: string;
  card: CardsProps[];
}
export default function BlogCards({ mainTitle, card }: BlogCardsProps) {
  return (
    <>
      <div className="max-w-7xl m-auto pt-16">
        <div className="flex flex-wrap justify-center gap-6">
          {card.map((c, i) => {
            return (
              <div key={i} className="">
                <div className="bg-white" style={{ width: '348px' }}>
                  <a href={`${routes.blog.path}/${c.slug}`}>
                    <div
                      className={`flex justify-between bg-no-repeat bg-center h-64 bg-cover pb-2`}
                    >
                      {c.img ? (
                        <Image src={c.img} width="348" height="256" />
                      ) : null}
                    </div>
                  </a>

                  <div className="flex justify-between py-2">
                    <h1
                      className="text-grey-8C8C8C font-bebas text-lg font-bold italic"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      {c.topic}
                    </h1>
                    <h1
                      className="text-grey-8C8C8C font-roboto text-sm"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      {c.date}
                    </h1>
                  </div>
                  <span
                    className="text-black-1c2023 font-bebas text-2xl font-bold italic"
                    style={{ letterSpacing: '0.5px' }}
                  >
                    {c.title}
                  </span>
                  <p className="text-black-1c2023 font-roboto text-sm py-2">
                    {c.description}
                  </p>
                  <a href={`${routes.blog.path}/${c.slug}`}>
                    <div className="flex items-center">
                      <button className="text-sm text-red-bc2026 font-roboto pr-3">
                        Read more
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.885"
                        height="8.525"
                        viewBox="0 0 12.885 8.525"
                      >
                        <path
                          id="Vector_7"
                          data-name="Vector 7"
                          d="M0,3.343H11.316m0,0L7.972,0m3.343,3.343L7.972,6.687"
                          transform="translate(0.65 0.919)"
                          fill="none"
                          stroke="#bc2026"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.3"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
