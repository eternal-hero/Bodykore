interface DoubleTextProps {
  title1?: string;
  title2?: string;
  title3?: string;
  description?: string;
  items?: string[];
}

export default function DoubleText({
  title1,
  title2,
  title3,
  description,
  items,
}: DoubleTextProps) {
  const mapItems = () => {
    return items?.map((item, index) => (
      <li key={index}>
        <div className="text-black">{item}</div>
      </li>
    ));
  };
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center lg:justify-start py-6 gap-16 lg:gap-28 pt-16">
          <div className="lg:pl-24 w-7/12">
            <h1 className="text-black-373933 text-5xl font-bebas font-bold italic text-center md:text-left">
              {title1}
            </h1>
            <h2 className="text-black-373933 text-2xl font-bebas text-center md:text-left">
              {title2}
            </h2>
            
            <div className="text-black-373933 text-sm font-roboto text-center md:text-left"  dangerouslySetInnerHTML={{
                            __html:
                            description!,
                          }}>
           

            </div>
          </div>
          <div>
            <h2 className="text-black-373933 text-2xl font-bebas pb-2 text-center md:text-left">
              EQUIPMENT
            </h2>
            <ul className="text-red leading-6 list-disc font-roboto font-bold text-sm">
              {mapItems()}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
