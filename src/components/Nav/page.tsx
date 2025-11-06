"use client";

import * as React from "react";
import { Moon, Sun, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { globalSearchCache } from "@/lib/searchCache";
import { products as allProducts, type Product } from "@/types";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Product[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const performSearch = React.useCallback(async (q: string): Promise<Product[]> => {
    const trimmed = q.trim();
    if (!trimmed) return [] as Product[];
    const cacheKey = `q:${trimmed.toLowerCase()}`;
    const cached = globalSearchCache.get(cacheKey);
    if (cached) return cached as Product[];
    // Simulate API by filtering local data; swap to real API as needed
    const result = allProducts.filter((p: Product) =>
      p.name.toLowerCase().includes(trimmed.toLowerCase())
    );
    globalSearchCache.set(cacheKey, result);
    return result;
  }, []);

  // Debounced search
  React.useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    const id = setTimeout(async () => {
      const res = await performSearch(searchTerm);
      setSuggestions(res.slice(0, 6));
      setIsSearching(false);
      setShowSuggestions(true);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm, performSearch]);

  const onSubmitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchTerm.trim();
    if (!q) return;
    setShowSuggestions(false);
    router.push(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white cursor-pointer"   onClick={() => router.push("/")}>
            SHOP.CO
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Categories
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/products?men")}>
                  Men
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?women")}>
                  Women
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?kids")}>
                  Kids
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?accessories")}>
                  Accessories
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  On Sale
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/products?sale-under-25")}>
                  Under $25
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?sale-50-off")}>
                  50% Off
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?sale-clearance")}>
                  Clearance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => router.push("/products?new=true")}>
                  New Arrivals
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/products?new-this-week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?new-this-month")}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?trending=true")}>
                  Trending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Brands
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/products?brands-nike")}>
                  Nike
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?brands-adidas")}>
                  Adidas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?brands-puma")}>
                  Puma
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/products?brands-zara")}>
                  Zara
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex relative w-96">
            <form onSubmit={onSubmitSearch} className="w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                placeholder="Search for the Products"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 text-start text-sm outline-none border-0"
              />
            </form>
            {showSuggestions && (suggestions.length > 0 || isSearching) && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                {isSearching ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                ) : (
                  suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        router.push(`/products/${p.id}?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(String(p.price))}`);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {p.name}
                    </button>
                  ))
                )}
                <div className="border-t border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => onSubmitSearch()}
                  className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View all results
                </button>
              </div>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => router.push("/cart")}>
              <ShoppingBag size={20} />
            </button>
            <Avatar className="h-8 w-8"  onClick={() => router.push("/profile")}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Search and Icons */}
          <div className="flex md:hidden items-center space-x-2">
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" >
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={() => router.push("/cart")}>
              <ShoppingBag size={20} />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <form onSubmit={(e) => { e.preventDefault(); onSubmitSearch(); }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                placeholder="Search for the Products"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 text-start text-sm outline-none border-0"
              />
            </form>
            {showSuggestions && (suggestions.length > 0 || isSearching) && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                {isSearching ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                ) : (
                  suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        router.push(`/products/${p.id}?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(String(p.price))}`);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {p.name}
                    </button>
                  ))
                )}
                <div className="border-t border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => onSubmitSearch()}
                  className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View all results
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    Categories
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  <DropdownMenuItem onClick={() => router.push("/men")}>
                    Men
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/women")}>
                    Women
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/kids")}>
                    Kids
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/accessories")}>
                    Accessories
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    On Sale
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  <DropdownMenuItem onClick={() => router.push("/sale/under-25")}>
                    Under $25
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/sale/50-off")}>
                    50% Off
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/sale/clearance")}>
                    Clearance
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    New Arrivals
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  <DropdownMenuItem onClick={() => router.push("/new/this-week")}>
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/new/this-month")}>
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/new/trending")}>
                    Trending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    Brands
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  <DropdownMenuItem onClick={() => router.push("/brands/nike")}>
                    Nike
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/brands/adidas")}>
                    Adidas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/brands/puma")}>
                    Puma
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/brands/zara")}>
                    Zara
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center justify-between px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
