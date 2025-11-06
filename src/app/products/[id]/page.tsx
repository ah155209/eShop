"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { Star, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductById, Product } from "@/types";
import Card from "@/components/products/cards/productCard";
import { products, getProductsByCategory } from "@/types";
import { testimonials } from "@/types/index";
import ReviewCard from "@/components/products/cards/reviewCard";
export default function ProductDetail() {
  const { id } = useParams(); // Gets the dynamic route param
  const searchParams = useSearchParams(); // Gets query params
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [activeTab, setActiveTab] = useState("rating&reviews");
  // Get product data from centralized source
  const productId = parseInt(id as string);
  const product = getProductById(productId);

  // Fallback product data if not found
  const fallbackProduct: Product = {
    id: productId,
    name: searchParams.get("name") || "Product Not Found",
    image: "/images/tShirt.png",
    rating: 4.5,
    price: parseInt(searchParams.get("price") || "0"),
    oldPrice: 300,
    discount: "-40%",
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
  const categoryParam = searchParams.get("category");
  const currentProduct = product || fallbackProduct;
  // const category = categoryParam
  //   ? categoryParam
  //       .split("-")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ")
  //   : "All";
  const filteredProducts = categoryParam
    ? getProductsByCategory(categoryParam)
    : products;
  return (
    <div className="w mx-auto mb-14 py-10 px-20 ">
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

      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {currentProduct.images?.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                width={80}
                height={80}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-md object-cover cursor-pointer border ${
                  selectedImage === i ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <Image
              src={
                currentProduct.images?.[selectedImage] || currentProduct.image
              }
              alt={currentProduct.name}
              width={600}
              height={480}
              className="w-full h-[480px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div>
          <h1 className="text-3xl font-extrabold mb-2">
            {currentProduct?.name?.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.round(currentProduct.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill={
                  i < Math.round(currentProduct.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
            <span className="text-gray-600 text-sm">
              {currentProduct.rating}/5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-bold">${currentProduct.price}</p>
            {currentProduct.oldPrice && (
              <p className="text-gray-400 line-through">
                ${currentProduct.oldPrice}
              </p>
            )}
            {currentProduct.discount && (
              <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">
                {currentProduct.discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{currentProduct.description}</p>

          {/* Select Colors */}
          {currentProduct.colors && currentProduct.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">Select Colors</p>
              <div className="flex gap-3">
                {currentProduct.colors.map((color) => (
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
          )}

          {/* Choose Size */}
          {currentProduct.sizes && currentProduct.sizes.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">Choose Size</p>
              <div className="flex gap-3">
                {currentProduct.sizes.map((size) => (
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
          )}

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

      <div className=" border-gray-200 ">
        {/* Tabs */}
        <div className="flex justify-center gap-20 border-b ">
          {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab.toLowerCase().replace(/\s+/g, ""))
              }
              className={`relative pb-3 text-base md:text-2xl font-medium  ${
                activeTab === tab.toLowerCase().replace(/\s+/g, "")
                  ? "text-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase().replace(/\s+/g, "") && (
                <span className="absolute left-0 -bottom-[1px] h-[1.5px] w-full bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* Reviews Header */}
        {activeTab === "rating&reviews" && (
          <div className="flex justify-between items-center px-4 pb-4 my-10">
            <h2 className="text-lg font-semibold text-gray-900">
              All Reviews <span className="text-gray-400 text-sm">(451)</span>
            </h2>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700 cursor-pointer">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Latest</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Write a Review Button */}
              <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm font-medium">
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Tab content area */}
        <div className="mt-6">
          {activeTab === "productdetails" && (
            <p className="text-gray-600">Product details go here...</p>
          )}
          {activeTab === "rating&reviews" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
                {testimonials.slice(0, visibleCount).map((item, index) => (
                  <ReviewCard
                    key={index}
                    comment={item.text}
                    customerName={item.name}
                    rating={item.rating}
                  />
                ))}
              </div>
              {visibleCount < testimonials.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(prev + 4, testimonials.length)
                      )
                    }
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    More Reviews
                  </button>
                </div>
              )}
            </>
          )}
          {activeTab === "faqs" && (
            <p className="text-gray-600">Frequently asked questions...</p>
          )}
        </div>
      </div>

      <div className="text-center my-8 space-y-6">
        <div className=" text-5xl font-bold">YOU MIGHT ALSO LIKE</div>
        <div className="flex">
          {filteredProducts.slice(0, 4).map((product) => (
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
    </div>
  );
}
