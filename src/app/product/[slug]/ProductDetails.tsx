"use client";

import { Products } from "@/types/products";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";

interface ProductDetailsProps {
  product: Products;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const imageUrl = product.image?.asset._ref
    ? urlFor(product.image).width(500).height(500).url()
    : "/images/default-product.jpg";

  const handleAddToCart = (e: React.MouseEvent) => {
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
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            width={400}
            height={400}
            alt={product.name}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description || "No description available."}</p>

          {/* Price & Discount */}
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.discountPercent && (
              <span className="bg-pink-500/50 text-red-500 px-2 py-1 rounded-full text-sm">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Available Colors:</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Available Sizes:</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
