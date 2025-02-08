"use client"; // ✅ This makes it a Client Component

import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";

interface AddToCartButtonProps {
  product: any;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
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
    <button
      className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}
