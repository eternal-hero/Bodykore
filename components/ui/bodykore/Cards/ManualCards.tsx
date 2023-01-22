import Image from 'next/image';

interface ManualCardsParams {
  card: {
    image?: string;
    category?: string;
    title: string;
    ref: string;
    file?: string;
  }[];
}

export default function ManualCards({ card }: ManualCardsParams) {
  return (
    <>
      <div className="max-w-7xl m-auto pt-16">
        <div className="flex flex-wrap justify-center lg:justify-center gap-10">
          {/*Manual Cards*/}
          {card.map((c, i) => {
            return (
              <div key={i} className="pb-12 px-8 lg:px-0">
                <div className="bg-white w-64">
                  <div
                    className={`flex justify-between bg-no-repeat bg-center border-2 border-grey`}
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        width="256"
                        height="256"
                        objectFit="contain"
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="px-1">
                    <p className="text-grey-848484 font-roboto text-sm pt-2">
                      {c.category}
                    </p>
                    
                    <div>
                      <span
                        className="text-black-1c2023 font-bebas text-2xl font-bold italic pr-2"
                        style={{ letterSpacing: '1px' }}
                      >{`${c.title}`}</span>
                    
                    </div>

                    <p className="text-black-1c2023 font-roboto text-sm pb-2">{`Assembly instructions for the BodyKore ${c.title}`}.</p>
                    <a href={c.file} target="_blank" rel="noreferrer">
                      <button
                        className="w-52 h-12 mb-2 bg-transparent text-black-373933 hover:bg-red-bc2026 hover:text-white-f2f9fa border-2 border-black-373933 hover:border-red-bc2026 rounded-lg font-bebas transition"
                        style={{ letterSpacing: '1.5px' }}
                      >
                        <h1 className="mr-2">DOWNLOAD MANUAL</h1>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
