
"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"


export default function ProductDetail() {
  const { id } = useParams(); // Gets the dynamic route param
  const searchParams = useSearchParams(); // Gets query params
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const product = {
    name: "ONE LIFE GRAPHIC T-SHIRT",
    price: 260,
    oldPrice: 300,
    discount: "-40%",
    rating: 4.5,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3b40?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "olive", hex: "#4B5320" },
      { name: "green", hex: "#224D3A" },
      { name: "navy", hex: "#2E3A59" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  };
  return (
    <div className="max-w-2xl mx-auto py-10">

          {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product {id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="div">
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Side - Image Gallery */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              onClick={() => setSelectedImage(i)}
              className={`w-20 h-20 rounded-md object-cover cursor-pointer border ${
                selectedImage === i ? "border-black" : "border-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="flex-1">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-[480px] object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Right Side - Product Info */}
      <div>
        <h1 className="text-3xl font-extrabold mb-2">
          {product.name.toUpperCase()}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${
                i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={i < Math.round(product.rating) ? "currentColor" : "none"}
            />
          ))}
          <span className="text-gray-600 text-sm">{product.rating}/5</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-gray-400 line-through">${product.oldPrice}</p>
          <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">
            {product.discount}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Select Colors */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Select Colors</p>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  selectedColor === color.name
                    ? "border-black scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Choose Size */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Choose Size</p>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border text-sm transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-lg"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-lg"
            >
              +
            </button>
          </div>
          <button className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
       <div className="div"></div>
       <div className="div"></div>
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p className="text-lg text-gray-700 mb-4">Price: ${price}</p>
      <p className="text-gray-600">
        This is detailed information about product ID <strong>{id}</strong>.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Go Back
      </button>
      </div>
     
    </div>
  );
}