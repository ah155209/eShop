"use client";
import React from "react";
import Card from "@/components/products/cards/productCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, getProductsByCategory } from "@/types";
export default function ProductsPage() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");

  const category = categoryParam
    ? categoryParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All";

  // Filter products by category if specified
  const filteredProducts = categoryParam 
    ? getProductsByCategory(categoryParam)
    : products;

  return (
    <div className="flex flex-col justify-center items-center p-20">
      <div>{category}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [@media(min-width:1440px)]:grid-cols-5 gap-6 justify-items-center">
        {filteredProducts.map((product) => (
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
