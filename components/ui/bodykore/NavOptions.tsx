import { Dispatch } from 'react';

interface NavOptionsParams {
  title1: string;
  titles: {
    text: string;
    id: string;
  }[];
  type?: string;
  setter?: Dispatch<
    React.SetStateAction<{
      page: number;
      category: string;
    }>
  >;
}

export default function NavOptions({
  title1,
  titles,
  type,
  setter,
}: NavOptionsParams) {
  const scrollDown = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  function setCategory(category: string) {
    if (setter) {
      setter((prevState) => ({ ...prevState, page: 1, category: category }));
    }
  }

  return (
    <>
      {/*Main Image*/}
      <div
        className="flex justify-center gap-4 lg:gap-8 font-bebas font-bold text-2xl italic pt-20 pb-8"
        style={{ letterSpacing: '1px' }}
      >
        <h1
          className={type === '' || type === undefined ? 'text-red-bc2026' : 'cursor-pointer'}
          onClick={() => {
            setCategory('');
          }}
        >
          {title1}
        </h1>
        {titles.map((t, i) => {
          return (
            <h1
              key={i}
              className={type === t.id ? 'text-red-bc2026' : 'cursor-pointer'}
              onClick={() => {
                scrollDown(t.id);
                setCategory(t.id);
              }}
            >
              {t.text}
            </h1>
          );
        })}
      </div>
    </>
  );
}
