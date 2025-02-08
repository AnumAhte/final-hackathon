"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { four } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Products } from "@/types/products"; // ✅ Import the proper type

const LikeSection = () => {
  const [products, setProducts] = useState<Products[]>([]); // ✅ Use proper type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Products[] = await client.fetch(four); // ✅ Typecast fetched data
        if (data.length > 0) {
          setProducts(data);
        } else {
          setError("No products found");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide">
          YOU MIGHT ALSO LIKE
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => {
            return (
              <Link
                key={product._id}
                href={`/product/${product.slug?.current}`} // ✅ Optional chaining to avoid errors
                passHref
              >
                <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow relative group cursor-pointer">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).width(300).height(300).url()}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-auto rounded transform group-hover:scale-110 transition-transform"
                    />
                  )}
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <div className="text-lg font-bold text-gray-800">
                    ${product.price}
                    {product.discountPercent && (
                      <span className="text-sm text-red-500 ml-2">
                        {product.discountPercent}% off
                      </span>
                    )}
                  </div>
                  {product.new && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LikeSection;
