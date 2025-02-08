"use client";
import Image from "next/image";
import { motion } from "framer-motion";

function Herro() {
  return (
    <div className="w-full bg-[#F2F0F1] py-12 lg:py-20 relative">
      <div className="relative w-full">
        
        {/* Background Image with Fade-in Effect */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/hero/Rectangle 2.png"
            alt="Hero Image"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            priority
          />
        </motion.div>

        {/* Text Content Animation */}
        <motion.div
          className="absolute top-[10%] left-[10%] text-left text-black px-4 lg:px-8 hidden lg:block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            FIND CLOTHES<br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
         

          {/* Animated Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Text Section */}
      <motion.div
        className="text-center mt-8 lg:hidden px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          FIND CLOTHES<br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-700">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Herro;
