"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <main className="border-b-2 bg-white shadow-md">
      <div className="w-full flex items-center justify-center h-[70px] px-4 sm:px-6 lg:px-8">
        {/* All Content */}
        <div className="w-full max-w-7xl flex items-center justify-between h-[50px]">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-gray-900">SHOP.CO</h1>
          </Link>

          {/* Links - Animated Sliding Nav */}
          <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-40 transform ${
              open ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:static md:bg-transparent md:translate-x-0 md:flex md:items-center`}
          >
            {/* Side Menu */}
            <div className="bg-white w-3/4 sm:w-1/2 md:w-auto md:bg-transparent md:flex md:items-center h-full md:h-auto p-6 md:p-0 shadow-lg md:shadow-none">
              <ul className="flex flex-col md:flex-row md:gap-x-6 text-lg md:text-base font-medium text-gray-800">
                <li className="hover:text-gray-600 transition-all">
                  <Link href="/" onClick={closeMenu}>
                    Shop
                  </Link>
                </li>
                <li className="hover:text-gray-600 transition-all">
                  <Link href="/manT" onClick={closeMenu}>
                    On Sale
                  </Link>
                </li>
                <li className="hover:text-gray-600 transition-all">
                  <Link href="/casual" onClick={closeMenu}>
                    New Arrivals
                  </Link>
                </li>
                <li className="hover:text-gray-600 transition-all">
                  <Link href="/signup" onClick={closeMenu}>
                    Brands
                  </Link>
                </li>
              </ul>

              {/* Close Button for Mobile Menu */}
              <button
                className="absolute top-6 right-6 text-gray-900 text-3xl md:hidden"
                onClick={closeMenu}
                aria-label="Close Menu"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex w-96 bg-gray-100 rounded-full items-center px-3 py-1">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            <input
              className="w-full bg-transparent outline-none px-2 py-1 text-gray-800"
              type="search"
              placeholder="Search for products..."
              aria-label="Search"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-x-4">
            {/* Cart Icon */}
            <Link href="/cart">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="w-6 h-6 text-gray-700 hover:text-black transition"
              />
            </Link>

            {/* Account Icon */}
            <Link href="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700 hover:text-black transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>

            {/* Toggle Button for Mobile */}
            <button
              className="text-gray-900 text-3xl md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Header;
