import React from 'react';
import { CartItemType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import { QuantitySelector } from '@/components/quantitySelector';

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 relative">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full sm:w-28 sm:h-28 rounded-lg object-cover mb-4 sm:mb-0"
      />
      
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Size: {item.size}, Color: {item.color}
        </p>
        <p className="font-bold text-xl mt-2">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-4 mt-4 sm:mt-0 ">
      <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 absolute top-4 right-4 sm:static"
          aria-label="Remove item"
        >
          <TrashIcon className="w-6 h-6" />
        </button>

        <QuantitySelector
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

      </div>
    </div>
  );
};