"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/products/cards/productCard";

function Page() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      image: "/images/tShirt.png",
      rating: 4.5,
      price: 120,
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      image: "/images/jeans.png",
      rating: 3.5,
      price: 240,
      oldPrice: 260,
      discount: "20%",
    },
    {
      id: 3,
      name: "Checkered Shirt",
      image: "/images/shirt.png",
      rating: 4.5,
      price: 180,
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      image: "/images/tShirt2.png",
      rating: 4.5,
      price: 130,
      oldPrice: 160,
      discount: "30%",
    },
    {
      id: 5,
      name: "Shorts",
      image: "/images/shorts.png",
      rating: 4,
      price: 140,
      oldPrice: 170,
      discount: "30%",
    },
  ];

  return (
    <div className="flex-col my-8 sm:my-12 lg:my-16 space-y-8 sm:space-y-12 lg:space-y-16 px-4 sm:px-8 lg:px-0">
      {/* Heading */}
      <div className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold">
        NEW ARRIVALS
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            oldPrice={product.oldPrice}
            discount={product.discount}
            title={product.name}
            rating={product.rating}
            price={product.price}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <button
          onClick={() => router.push("/products?category=NEW-Arrivals&limit=20")}
          className="px-6 sm:px-8 py-2 sm:py-3 border rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
        >
          View All
        </button>
      </div>

      {/* Divider */}
      <div className="border-b" />
    </div>
  );
}

export default Page;
