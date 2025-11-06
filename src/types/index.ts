// Product Types
export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: string;
  description?: string;
  images?: string[];
  colors?: Color[];
  sizes?: string[];
  category?: string;
  inStock?: boolean;
  brand?: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date?: string;
}

// Product Data
export const products: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/images/tShirt.png",
    rating: 4.5,
    price: 120,
    category: "T-shirts",
    inStock: true,
    brand: "Shopico",
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
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
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/images/jeans.png",
    rating: 3.5,
    price: 240,
    oldPrice: 260,
    discount: "20%",
    category: "Jeans",
    inStock: true,
    brand: "Shopico",
    description: "Classic skinny fit jeans made from premium denim. Perfect for casual and semi-formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "blue", hex: "#1E3A8A" },
      { name: "black", hex: "#000000" },
      { name: "gray", hex: "#6B7280" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "/images/shirt.png",
    rating: 4.5,
    price: 180,
    category: "Shirts",
    inStock: true,
    brand: "Shopico",
    description: "Classic checkered shirt with a modern fit. Made from high-quality cotton blend for comfort and durability.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "red", hex: "#DC2626" },
      { name: "blue", hex: "#2563EB" },
      { name: "green", hex: "#059669" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/images/tShirt2.png",
    rating: 4.5,
    price: 130,
    oldPrice: 160,
    discount: "30%",
    category: "T-shirts",
    inStock: true,
    brand: "Shopico",
    description: "Stylish striped t-shirt with unique sleeve design. Perfect for casual wear and street style.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "white", hex: "#FFFFFF" },
      { name: "black", hex: "#000000" },
      { name: "gray", hex: "#6B7280" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
  {
    id: 5,
    name: "Shorts",
    image: "/images/shorts.png",
    rating: 4,
    price: 140,
    oldPrice: 170,
    discount: "30%",
    category: "Shorts",
    inStock: true,
    brand: "Shopico",
    description: "Comfortable and stylish shorts perfect for summer. Made from lightweight, breathable material.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1506629905607-1a2b1b1b1b1b?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "khaki", hex: "#8B7355" },
      { name: "navy", hex: "#1E3A8A" },
      { name: "black", hex: "#000000" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: 6,
    name: "VERTICAL STRIPED SHIRT",
    image: "/images/shirt2.png",
    rating: 4.5,
    price: 220,
    category: "Shirts",
    inStock: true,
    brand: "Shopico",
    description: "Elegant vertical striped shirt with a sophisticated design. Perfect for business casual and formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=60",
    ],
    colors: [
      { name: "white", hex: "#FFFFFF" },
      { name: "blue", hex: "#2563EB" },
      { name: "pink", hex: "#EC4899" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
];

// Sample Reviews Data
export const reviews: Review[] = [
  {
    id: 1,
    customerName: "John Doe",
    rating: 5,
    comment: "Excellent quality and perfect fit! Highly recommended.",
    date: "2024-01-15",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    rating: 4,
    comment: "Great product, fast shipping. Will definitely order again.",
    date: "2024-01-10",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    rating: 5,
    comment: "Amazing quality and design. Exceeded my expectations!",
    date: "2024-01-08",
  },
];

// Utility Functions
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedProducts = (limit: number = 5): Product[] => {
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getNewArrivals = (limit: number = 5): Product[] => {
  // For demo purposes, returning first 5 products as "new arrivals"
  return products.slice(0, limit);
};

export const getTopSellingProducts = (limit: number = 5): Product[] => {
  // For demo purposes, returning products with highest ratings as "top selling"
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount);
};

// Categories
export const categories = [
  "All",
  "T-shirts",
  "Shirts", 
  "Jeans",
  "Shorts",
  "Dresses",
  "Accessories",
];

// Brands
export const brands = [
  "Shopico",
  "Nike",
  "Adidas",
  "Zara",
  "H&M",
  "Uniqlo",
];


export const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 4,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 4,
  },
  {
    name: "Clark",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 4.5,
  },
  {
    name: "James Bond",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 4,
  },
];