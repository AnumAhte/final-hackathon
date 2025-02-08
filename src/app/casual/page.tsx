"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries"; // Replace with your GROQ query for casual products
import { Products } from "@/types/products"; // Assuming the same type is used
import { urlFor } from "@/sanity/lib/image";

const CasualPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]); // Default price range

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(allProducts); // Use your GROQ query for casual products
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Apply price filter whenever the price range changes
  useEffect(() => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [priceRange, products]);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left-side Filter Section */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6 mb-8 lg:mb-0">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Price</h3>
            <div className="flex items-center">
              <input
                type="range"
                min="50"
                max="200"
                value={priceRange[1]} // Use the max value for the single range input
                onChange={(e) => setPriceRange([50, parseInt(e.target.value)])} // Update the max value
                className="flex-grow mr-3 accent-gray-800"
              />
              <span className="text-gray-700">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
          </div>

          {/* Other Filters (unchanged) */}
          {/* Categories, Colors, Size, Dress Style */}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Casual</h1>
            <p className="text-gray-600">
              Showing 1-{filteredProducts.length} of {filteredProducts.length} products | Sort by: <span className="font-semibold">Most Popular</span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product._id} href={`/product/${product.slug.current}`} passHref>
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow"
                  onMouseEnter={() => !isMobile && setHoveredProductId(product._id)}
                  onMouseLeave={() => !isMobile && setHoveredProductId(null)}
                >
                  {product.image && (
                    <Image
                      src={urlFor(product.image).width(300).height(300).url()}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={index < Math.round(product.discountPercent ?? 0) ? "text-yellow-400" : "text-gray-300"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasualPage;
