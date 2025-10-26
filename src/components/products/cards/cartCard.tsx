import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
//   onQuantityChange?: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  size,
  color,
  price,
  quantity,
//   onQuantityChange,
}) => {
//   const handleDecrement = () => {
//     if (quantity > 0) {
//       onQuantityChange?.(quantity - 1);
//     }
//   };

//   const handleIncrement = () => {
//     onQuantityChange?.(quantity + 1);
//   };

  return (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg max-w-sm">
      <Image
        src={imageSrc}
        alt={title}
        width={80}
        height={80}
        className="w-20 h-20 flex-shrink-0 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">Size: {size}</p>
        <p className="text-xs text-gray-500">Color: {color}</p>
        <p className="text-lg font-semibold text-gray-900 mt-2">${price}</p>
        <div className="flex items-center gap-2 mt-3">
          {/* <button
            onClick={handleDecrement}
            disabled={quantity <= 0}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button> */}
          {/* <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
            {quantity}
          </span> */}
          {/* <button
            onClick={handleIncrement}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            +
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;