"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define the type for the product object
interface Product {
  name: string;
  image: string;
}

function Happy() {
  const [index, setIndex] = useState(0);
  const products: Product[] = [
    { name: "review1", image: "/images/new/Frame 22.png" },
    { name: "review2", image: "/images/new/Frame 61.png" },
    { name: "review3", image: "/images/new/Frame 62.png" },
    
  ];

  // Handle Next Slide
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Handle Previous Slide
  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-gray-900 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide">
          OUR HAPPY CUSTOMERS
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          See what our satisfied customers have to say!
        </p>
      </div>

      {/* Swipable Section */}
      <div className="relative flex justify-center items-center">
        {/* Left Arrow */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 md:left-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12m0 0l7.5-7.5" />
          </svg>
        </button>

        <div className="overflow-hidden w-full max-w-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x > 50) prevSlide(); // Swipe Right
                if (info.offset.x < -50) nextSlide(); // Swipe Left
              }}
              className="flex justify-center"
            >
              <ProductBox product={products[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide} 
          className="absolute right-4 md:right-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12m0 0l-7.5 7.5" />
          </svg>
        </button>
      </div>
    </main>
  );
}

// Product Box Component
const ProductBox = ({ product }: { product: Product }) => (
  <div className="group shadow-xl bg-white rounded-lg overflow-hidden w-80 sm:w-96 p-6 flex flex-col items-center text-center">
    <div className="relative w-full h-[200px] flex justify-center items-center">
      <Image
        src={product.image}
        width={300}
        height={200}
        alt={product.name}
        className="rounded-lg object-cover"
      />
    </div>
    <h2 className="text-gray-900 font-semibold text-lg mt-4">{product.name}</h2>
  </div>
);

export default Happy;
