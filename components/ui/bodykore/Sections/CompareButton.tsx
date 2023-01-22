import { useProductCompareBuilder } from '@lib/productCompareContext';
import React from 'react';
import { ProductCompare } from './Product';

interface CompareButtoProps {
  product: ProductCompare;
}
function CompareButton({ product }: CompareButtoProps) {
  const { addProductCompare } = useProductCompareBuilder();

  const addToCompare = (data: object) => {
    addProductCompare(data as ProductCompare);
  };
  return (
    <button
      onClick={() => addToCompare(product)}
      className="bg-gray-200 hover:bg-gray-300 text-grey py-2 px-4 rounded-md"
    >
      Compare
    </button>
  );
}

export default CompareButton;
