"use client";
import React from "react";
import Card from "@/components/products/cards/productCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// interface ProductsPageProps {
//   searchParams: {
//     category?: string;
//     limit?: string;
//   };
// }
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
export default function ProductsPage() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  const category = categoryParam
    ? categoryParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All";

  console.log("category", category);

  return (
    <div className="flex flex-col justify-center items-center p-20">
      <div>{category}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [@media(min-width:1440px)]:grid-cols-5 gap-6 justify-items-center">
        {products.map((product) => (
          <Link
            key={product.id}
            href={{
              pathname: `/products/${product.id}`,
              query: { name: product.name, price: product.price },
            }}
          >
            <Card
              key={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              title={product.name}
              rating={product.rating}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
