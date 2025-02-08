"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link"; 
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; 
import { eight, allProducts } from "@/sanity/lib/queries"; 
import { Products } from "@/types/products"; 
import { urlFor } from "@/sanity/lib/image"; 

// Product Box Component
const ProductBox = ({ product }: { product: Products }) => {
  const imageUrl = product.image?.asset._ref
    ? urlFor(product.image).width(300).height(300).url()
    : "/images/default-product.jpg";

  return (
    <Link href={`/product/${product.slug.current}`} passHref> 
      <div className="group shadow-md hover:shadow-lg transition-shadow duration-300 bg-neutral-200 flex flex-col items-center justify-between sm:w-full md:w-[300px] lg:w-[220px] h-auto p-4 rounded-lg cursor-pointer">
        
        <div className="relative w-full flex justify-center">
          <Image
            src={imageUrl}
            width={150}
            height={150}
            alt={product.name}
            className="rounded-md"
          />
        </div>

        <h1 className="font-bold font-sans pt-2 text-center text-gray-700">{product.name}</h1>

        <div className="flex space-x-1 text-yellow-400 text-md pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={i < (product.discountPercent ?? 0) ? solidStar : regularStar}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-black font-bold text-xl">{product.price}</span>
          {product.discountPercent && (
            <span className="text-gray-400 font-bold line-through">
              {(
                product.price +
                (product.price * product.discountPercent) / 100
              ).toFixed(2)}
            </span>
          )}

          {product.discountPercent && (
            <span className="bg-pink-500/50 text-red-500 px-2 py-1 rounded-full text-sm">
              -{product.discountPercent}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const TopSelling = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = showAll ? await client.fetch(allProducts) : await client.fetch(eight); 
        if (data && data.length > 0) {
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
  }, [showAll]);

  const handleViewAll = () => {
    setShowAll(true); 
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mt-10 mb-10">
        <h1 className="text-gray-800 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          TOP SELLING
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>

      {!showAll && (
        <div className="w-full flex justify-center items-center mt-10">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg border-b-2 border-neutral-100 pb-4">
            <button
              className="w-full bg-white hover:bg-gray-200 py-2 px-5 text-black rounded-full border-2 border-black transition-colors duration-300"
              onClick={handleViewAll}
            >
              View All
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default TopSelling;
