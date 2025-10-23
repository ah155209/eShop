
"use client";
import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

  const name = searchParams.get("name");
  const price = searchParams.get("price");

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
  );
}