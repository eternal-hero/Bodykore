/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ProductCompare } from '@components/ui/bodykore/Sections/Product';

type Props = {
  productCompare: ProductCompare[];
  compareIds: string;
  children: React.ReactNode;
};

type ProductCompareValue = {
  productCompare: ProductCompare[];
  compareIds: string;
  addProductCompare: (productcompare: ProductCompare) => void;
  deleteProductCompare: () => void;
  deleteSingleProductCompare: (id: string) => void;
};

const ProductCompareContext = createContext<undefined | ProductCompareValue>(
  undefined
);

export function ProductCompareBuilderProvider({
  children,
  productCompare,
  compareIds,
}: Props) {
  const state = useProductCompareBuilderState(productCompare, compareIds);

  const context = {
    ...state,
  };

  return (
    <ProductCompareContext.Provider value={context}>
      {children}
    </ProductCompareContext.Provider>
  );
}

export function useProductCompareBuilder() {
  const context = useContext(ProductCompareContext);
  if (!context) throw new Error('Missing ProductCompareBuilderProvider!');
  return context;
}

function useProductCompareBuilderState(
  _productCompare: ProductCompare[],
  _compareIds: string
) {
  const [productCompare, setProductCompare] = useState(_productCompare);
  const [compareIds, setCompareIds] = useState(_compareIds);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('compareproduct')) {
        _productCompare = JSON.parse(localStorage.getItem('compareproduct')!);
        _productCompare.forEach((ele, i) => {
          _compareIds +=
            i == _productCompare.length - 1 ? ele.id : ele.id + ',';
        });
      }
    }
    setProductCompare(_productCompare);
    setCompareIds(_compareIds);
  }, [_productCompare, _compareIds]);

  const addProductCompare = useCallback((data: ProductCompare) => {
    if (localStorage.getItem('compareproduct') != undefined) {
      setCompareIds('');
      _compareIds = '';
      let arrVal = JSON.parse(localStorage.getItem('compareproduct')!);
      if (arrVal.length <= 2) {
        if (!arrVal.map((val: ProductCompare) => val.id).includes(data.id)) {
          arrVal = [data, ...arrVal];
        }
      }

      arrVal.forEach((ele: ProductCompare, i: number) => {
        _compareIds += i == arrVal.length - 1 ? ele.id : ele.id + ',';
      });
      setCompareIds(_compareIds);

      localStorage.setItem(
        'compareproduct',
        JSON.stringify(arrVal) as unknown as string
      );
    } else {
      localStorage.setItem('compareproduct', JSON.stringify([data]));
      setCompareIds(data.id as string);
    }

    setProductCompare(JSON.parse(localStorage.getItem('compareproduct')!));
  }, []);

  const deleteProductCompare = useCallback(() => {
    localStorage.removeItem('compareproduct');
    setProductCompare([] as ProductCompare[]);
    setCompareIds('');
  }, []);
  const deleteSingleProductCompare = useCallback((id: string) => {
    let arrVal = JSON.parse(localStorage.getItem('compareproduct')!);
    arrVal = arrVal.filter((ele: ProductCompare) => ele.id != id);
    setProductCompare(arrVal);
    arrVal.forEach((ele: ProductCompare, i: number) => {
      _compareIds += i == arrVal.length - 1 ? ele.id : ele.id + ',';
    });
    setCompareIds(_compareIds);
    localStorage.setItem(
      'compareproduct',
      JSON.stringify(arrVal) as unknown as string
    );
  }, []);

  return {
    productCompare,
    compareIds,
    setProductCompare,
    setCompareIds,
    addProductCompare,
    deleteProductCompare,
    deleteSingleProductCompare,
  };
}
