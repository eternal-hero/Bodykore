import { useEffect, useState } from 'react';
import { Range } from 'react-range';
import { CardProps } from './Cards/SellCardsaddon';

const MAX_VALUE = 1000;

interface PriceRangeParams {
  value?: number;
  maxValue: (CardProps & {
    cursor: string;
  })[];
  setter: (value?: number) => void;
}

const PriceRange = ({ value, setter, maxValue }: PriceRangeParams) => {
  const [state, setState] = useState({ values: [MAX_VALUE] });
  const [maxFinal, setMaxFinal] = useState(0);
  let maxPrice: number[] = [];
  useEffect(() => {
    setState({ values: [value !== undefined ? value : MAX_VALUE] });
  }, [value, maxFinal]);

  maxValue.forEach((ele) => {
    maxPrice.push(parseInt(ele.price));
  });

  const max = maxPrice.reduce((a, b) => Math.max(a, b), -Infinity);
  const min = maxPrice.reduce((a, b) => Math.min(a, b), Infinity);

  setTimeout(() => {
    if (max != -Infinity) {
      setMaxFinal(max);
    }
    if (max != Infinity) {
      setMaxFinal(max);
    }
  }, 1);

  return (
    <section>
      <div className="pb-3"></div>
      <Range
        step={10}
        min={min}
        max={MAX_VALUE}
        values={state.values}
        onChange={(values) => setState({ values })}
        onFinalChange={(values) => {
          if (values[0] === MAX_VALUE) {
            setter();
          } else {
            setter(values[0]);
          }
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc',
            }}
            className="rounded-md"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '12px',
              width: '12px',
              backgroundColor: '#BC2026',
            }}
            className="rounded-md"
          />
        )}
      />
      <div className="flex justify-between text-sm text-black-373933 pt-2">
        <span>${min}</span>
        {/* <span>
          {state.values[0] === MAX_VALUE &&  `${state.values[0]}$`}
        </span> */}
        {maxFinal != 0 && <span>${maxFinal}</span>}{' '}
        {/* Aqui va el valor del maximo */}
        {maxFinal == 0 && <span>loading</span>}{' '}
        {/* Aqui va el valor del maximo */}
      </div>
    </section>
  );
};

export default PriceRange;
