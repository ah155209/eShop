"use client"; // Add this if using Next.js App Router

import React, { useState, useMemo } from 'react';
import { CartItemType } from '@/types';
import { initialCartItems } from '@/types';
import { CartItemList } from '@/components/cart/lists';
import { OrderSummary } from '@/components/orderSummary';

 const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  // --- State Handlers ---
  
  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // --- Memoized Calculations ---
  
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    // Values from the image
    const discountPercent = 0.20; 
    const discount = subtotal * discountPercent;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return { subtotal, discount, deliveryFee, total };
  }, [cartItems]);

  // --- Render ---

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 space-y-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold uppercase mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-xl bg-white p-12 rounded-lg shadow">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <CartItemList
                items={cartItems}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
            </div>
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <OrderSummary
                subtotal={calculations.subtotal}
                discount={calculations.discount}
                deliveryFee={calculations.deliveryFee}
                total={calculations.total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage