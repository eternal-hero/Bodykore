interface FacProps {
  icon?: string;
  title?: string;
  description?: string;
}

export interface ThreeProps {
  icon?: string;
  title?: string;
  description?: string;
}

interface ThreekeysProps {
  threekeys: ThreeProps[];
  factors: FacProps[];
  textSize?: string;
  division?: string;
  imgWidth?: string;
  imgHeight?: string;
}

export default function Threekeys({
  threekeys,
  textSize,
  division,
  imgHeight,
  imgWidth,
}: ThreekeysProps) {
  return (
    <section className="">
      <div className={`flex flex-wrap flex-row items-center justify-center`}>
        {threekeys.map((f, i) => {
          return (
            <div className="lg:w-1/5 lg:flex lg:flex-row" key={i}>
              <div className="w-10 m-auto">
                <img src={f.icon} alt="" className="w-10" />
              </div>
              <div className="w-40 text-center sm:text-left">
                <p
                  className={`font-bebas italic text-black-373933 text-lg`}
                  style={{ letterSpacing: '0.5px' }}
                >
                  {f.title}
                </p>
                <p
                  className={`font-roboto text-black-373933 ${textSize}`}
                  style={{ letterSpacing: '0.5px' }}
                >
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
