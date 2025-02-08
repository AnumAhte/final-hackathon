"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems, removeFromCart, updateCartQuantity } from "@/app/actions/actions";
import { Products } from "@/types/products";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = getCartItems();
    setCartItems(items);
    calculateSubtotal(items);
  };

  const calculateSubtotal = (items: Products[]) => {
    const total = items.reduce((acc, item) => acc + item.price * (item.inventory || 1), 0);
    setSubtotal(total);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    removeFromCart(id);
    calculateSubtotal(updatedCart);
  };

  const handleIncrease = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, inventory: (item.inventory || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartQuantity(id, updatedCart.find(item => item._id === id)!.inventory);
    calculateSubtotal(updatedCart);
  };

  const handleDecrease = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.inventory > 1
        ? { ...item, inventory: item.inventory - 1 }
        : item
    );
    setCartItems(updatedCart);
    updateCartQuantity(id, updatedCart.find(item => item._id === id)!.inventory);
    calculateSubtotal(updatedCart);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <span className="text-sm font-medium">Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart List */}
            <div className="lg:col-span-2 bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="p-1 border rounded text-gray-600"
                      >
                        -
                      </button>
                      <span>{item.inventory}</span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="p-1 border rounded text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium">${item.price * (item.inventory || 1)}</p>
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span>
              </p>
              <button
                className="w-full mt-4 h-12 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
