import { useEffect } from 'react';

interface DropdownProps {
  title: string;
  placeholder: string;
  options: string[];
  setter?: (value: string) => void;
  type?: string;
  width?: string
}

export default function ProductsDropdown({
  title,
  placeholder,
  options,
  setter,
  type,
  width
}: DropdownProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className={`flex md:gap-8 ${width}`}>
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-grey-848484 text-xs"
              htmlFor="grid-product-type"
            >
              {title}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full text-gray-700 py-2 px-4 pr-8 leading-tight"
                id="grid-product-type"
                onChange={(event) => {
                  if (setter) {
                    setter(
                      event.currentTarget.value !== placeholder
                        ? event.currentTarget.value
                        : ''
                    );
                  }
                }}
              >
                <option value="" selected={type !== undefined || type === ''}>
                  {placeholder}
                </option>
                {options.map((t, i) => {
                  return (
                    <option key={i} value={t} selected={type === t}>
                      {t}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
