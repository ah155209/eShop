"use client";
import React from 'react'
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Card from '@/components/products/cards/cartCard'
function page() {
//  const handleQuantityChange = ( )=> {
//    // Handle quantity change logic here
//  }
  return (
    <div className='min-h-screen py-8 px-8 mx-auto'>
       <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>         
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8 space-y-8 ">
        <div className="text-5xl font-bold ">
          YOUR CART
        </div>
        <div className="flex flex-col sm:flex-row gap-3 ">
            {/* Selected Items*/}
          <div className="w-1/2 border-2 border-gray-200 rounded-2xl  ">
             <Card 
              imageSrc={"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=60"}
              title={'Gradient Graphic T-shirt'}
              size={'large'}
              color={'red'}
              price={25}
              quantity={1}
              // onQuantityChange={handleQuantityChange}
             />

          </div>
            {/*Order Summary*/}
    
          <div className="w-1/2 border-2 border-gray-200 rounded-2xl ">
             <div className="div"> Order Summary</div>      
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
