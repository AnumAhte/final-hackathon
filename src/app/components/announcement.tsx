/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";

function AnnouncementBar() {
  const responsiveText = "text-sm";

  return (
    <motion.section
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-black text-[#e2e8f0] flex justify-center items-center h-2 sm:h-12 md:h-14 lg:h-10"
    >
      {/* Wrapper for centered content */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center items-center text-center gap-2"
        >
          <h1 className={`${responsiveText} flex items-center`}>
            <span className="hidden sm:block">
              Sign up and get 20% off your first order.
            </span>
          </h1>
          <motion.a
            href="/shop"
            className={`font-bold underline ${responsiveText} hover:text-gray-300 transition duration-200`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up Now
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AnnouncementBar;
