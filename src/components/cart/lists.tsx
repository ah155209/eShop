import React from 'react';
import { CartItemType } from '@/types';
import { CartItem } from './items';

type CartItemListProps = {
  items: CartItemType[];
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
};

export const CartItemList: React.FC<CartItemListProps> = ({ items, onRemove, onQuantityChange }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};