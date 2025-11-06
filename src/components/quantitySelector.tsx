import React from 'react';

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
}) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-2 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-bold text-base w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="p-2 rounded-full text-gray-600 hover:bg-gray-200"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};