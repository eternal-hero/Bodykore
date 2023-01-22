import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  title?: string;
  current: number;
  max: number;
  setter: Dispatch<
    React.SetStateAction<{
      page: number;
      category: string;
    }>
  >;
}

export default function Pagination({
  title,
  current,
  max,
  setter,
}: PaginationProps) {
  function setPage(value: number) {
    setter((prevState) => ({ ...prevState, page: value }));
  }
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="py-16">
          <ul className="flex justify-center gap-8">
            {current > 1 && (
              <li>
                <button
                  className="h-10 text-red-bc2026 transition-colors duration-150"
                  onClick={() => setPage(current - 1)}
                >
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
                      transform="scale(-1 1) translate(-12.235 0.919)"
                      fill="none"
                      stroke="#bc2026"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.3"
                    />
                  </svg>
                </button>
              </li>
            )}
            {current === max && current > 2 && (
              <li>
                <button
                  className="h-10 text-gray-char transition-colors duration-150"
                  onClick={() => setPage(current - 2)}
                >
                  {current - 2}
                </button>
              </li>
            )}
            {current > 1 && (
              <li>
                <button
                  className="h-10 text-gray-char transition-colors duration-150"
                  onClick={() => setPage(current - 1)}
                >
                  {current - 1}
                </button>
              </li>
            )}
            {max > 1 && (
              <li>
                <button className="h-10 text-red-bc2026 transition-colors duration-150">
                  {current}
                </button>
              </li>
            )}
            {current < max && (
              <li>
                <button
                  className="h-10 text-gray-char transition-colors duration-150"
                  onClick={() => setPage(current + 1)}
                >
                  {current + 1}
                </button>
              </li>
            )}
            {current === 1 && current < max - 1 && (
              <li>
                <button
                  className="h-10 text-gray-char transition-colors duration-150"
                  onClick={() => setPage(current + 2)}
                >
                  {current + 2}
                </button>
              </li>
            )}
            {current < max && (
              <li>
                <button
                  className="h-10 text-red-bc2026 transition-colors duration-150"
                  onClick={() => setPage(current + 1)}
                >
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
                </button>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
