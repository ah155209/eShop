"use client";
import React, { useMemo, Suspense } from "react";
import Card from "@/components/products/cards/productCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products as allProducts, getProductsByCategory } from "@/types"; // adjust import path as needed

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") ?? "";

  const category = useMemo(() => {
    if (!categoryParam) return "All";
    return categoryParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [categoryParam]);

  // Filter products by category if specified, fallback to allProducts
  const filteredProducts = useMemo(() => {
    if (!categoryParam) return allProducts;
    const list = getProductsByCategory(categoryParam);
    return Array.isArray(list) && list.length ? list : allProducts;
  }, [categoryParam]);

  // limit to 4 items
  const shownProducts = filteredProducts.slice(0, 4);

  return (
    <div className="flex flex-col justify-center items-center p-8 sm:p-12 md:p-20">
      <div className="mb-6 text-lg font-medium">{category}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [@media(min-width:1440px)]:grid-cols-5 gap-6 justify-items-center">
        {shownProducts.map((product) => (
          <Link
            key={product.id}
            href={{
              pathname: `/products/${product.id}`,
              query: { name: product.name, price: String(product.price) },
            }}
            className="w-full"
          >
            <Card
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
