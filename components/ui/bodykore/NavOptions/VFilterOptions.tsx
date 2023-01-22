interface Subcategories {
  name: string;
  id?: string;
}
interface VFilterOptionsProps {
  titles: {
    text: string;
    id?: string;
    subcategories: Subcategories[]
  }[];
  type?: string;
  subtype?: string;
  setter?: (value: string, subvalue: string) => void;
}

export default function VFilterOptions({
  titles,
  type,
  subtype,
  setter,
}: VFilterOptionsProps) {
  function setCategory(category: string, subcategory: string = '') {
    if (setter) {
      setter(category, subcategory);
    }
  }


  return (
    <>
      {/*Main Image*/}
      <div className="flex flex-col px-5" style={{ letterSpacing: '1px' }}>
        <h5 className='font-bebas text-2xl italic font-bold tracking-wideer py-2'>Shop By Category</h5>
        <div className="">
          {titles.map((t, i) => {
            return (

              <h5
                key={i}
                className={`font-roboto pl-2 py-1 ${type !== t.id
                  ? 'cursor-pointer text-black-1c2023'
                  : 'text-red-bc2026'
                  }`}
                onClick={() => {
                  if (t.id && type !== t.id) {
                    setCategory(t.id, '');
                  }
                }}
              >
                {t.text}
              </h5>
            );
          })}
        </div>
        {/* <h5 className='font-bebas text-2xl italic font-bold tracking-wideer py-2'>Shop By Sub-Category</h5> */}
        {/* <div className="">
          {titles.map((t, i) => {

            return (
              type === t.id && <h5
                key={i}

                onClick={() => {
                  if (t.id && type !== t.id) {
                    setCategory(t.id, '');
                  }
                }}
              >

                {
                  t.text != 'Packages' && t.subcategories.map((ele, i) => {
                    return <h5 key={i} className={`font-roboto pl-2 py-1 cursor-pointer:
                     ${subtype !== ele.name
                      ? 'cursor-pointer text-black-1c2023'
                      : 'text-red-bc2026'
                      }`} onClick={() => {
                        if (t.id) {
                          setCategory(t.id, ele.name);
                        }
                      }}>{ele.name}</h5>
                  })
                }
              </h5>

            );
          })}
        </div> */}
     

      </div>
    </>
  );
}
