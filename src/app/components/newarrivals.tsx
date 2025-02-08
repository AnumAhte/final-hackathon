"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client"; 
import { four } from "@/sanity/lib/queries"; 
import { Products } from "@/types/products"; 
import Image from "next/image"; 
import { urlFor } from "@/sanity/lib/image"; 
import Link from "next/link"; 
import { addToCart } from "../actions/actions";
import Swal from 'sweetalert2';

const NewArrivals = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(four); 
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

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mt-10 mb-10">
        <h1 className="text-gray-700 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          NEW ARRIVALS
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

const handleAddtocart = (e: React.MouseEvent, product: Products) => {
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

const ProductBox = ({ product }: { product: Products }) => {
  const imageUrl = product.image?.asset._ref
    ? urlFor(product.image).width(300).height(300).url()
    : "/images/default-product.jpg";

  return (
    <Link href={`/product/${product.slug.current}`} passHref>
      <div className="group shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-200 flex flex-col items-center justify-between sm:w-full md:w-[300px] lg:w-[220px] h-auto p-4 rounded-lg cursor-pointer">
        
        <div className="relative w-full flex justify-center">
          <Image
            src={imageUrl}
            width={150}
            height={150}
            alt={product.name}
            className="rounded-md"
          />
          <button
            className="absolute bottom-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => handleAddtocart(e, product)}
          >
            Add to Cart
          </button>
        </div>

        <h1 className="font-bold font-sans pt-2 text-center text-gray-700">{product.name}</h1>

        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-black font-bold text-xl">{product.price}</span>
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

export default NewArrivals;
