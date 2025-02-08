"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { one } from "@/sanity/lib/queries";
import { Products } from "@/types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";
import Link from "next/link"; // ✅ Import Next.js Link

const ProductPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(one);
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
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = (e: React.MouseEvent, product: Products) => {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 3000,
    });
    addToCart(product);
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mt-10 mb-10">
        <h1 className="text-gray-800 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Products
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const imageUrl = product.image?.asset?._ref
            ? urlFor(product.image).width(300).height(300).url()
            : "/images/default-product.jpg";

          return (
            <div key={product._id} className="group shadow-md bg-neutral-100 flex flex-col items-center justify-between sm:w-full md:w-[300px] lg:w-[220px] h-auto p-4 rounded-lg cursor-pointer">
              
              {/* ✅ Product Image with Slug Link */}
              <Link href={`/product/${product.slug?.current}`}>
                <Image
                  src={imageUrl}
                  width={150}
                  height={150}
                  alt={product.name}
                  className="rounded-md"
                />
              </Link>

              {/* ✅ Product Name with Slug Link */}
              <Link href={`/product/${product.slug?.current}`}>
                <h1 className="font-bold font-sans pt-2 text-center hover:text-blue-500 transition">
                  {product.name}
                </h1>
              </Link>

              {/* Price Section */}
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-black font-bold">{product.price}</span>
                {product.discountPercent && (
                  <span className="bg-pink-500/50 text-red-500 px-2 py-1 rounded-full text-sm">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProductPage;
