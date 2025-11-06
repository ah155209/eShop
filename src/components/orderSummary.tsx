import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { TagIcon, ArrowRightIcon } from 'lucide-react';

type OrderSummaryProps = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  deliveryFee,
  total,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount (-20%)</span>
          <span className="font-bold text-red-500">-{formatCurrency(discount)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-medium">{formatCurrency(deliveryFee)}</span>
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between font-bold text-xl mb-6">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <TagIcon className="w-5 h-5" />
          </span>
        </div>
        <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
          Apply
        </button>
      </div>

      <button className="bg-black text-white w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
        <span>Go to Checkout</span>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};