import { Products } from "@/types/products";

// Function to add a product to the cart
export const addToCart = (product: Products): void => {
  const cart: Products[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].inventory += 1; // Increment quantity
  } else {
    cart.push({ ...product, inventory: 1 }); // Add new product with quantity 1
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to remove a product from the cart
export const removeFromCart = (productId: string): void => {
  const cart: Products[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const updatedCart = cart.filter((item) => item._id !== productId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

// Function to update the quantity of a product in the cart
export const updateCartQuantity = (productId: string, quantity: number): void => {
  const cart: Products[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    cart[productIndex].inventory = Math.max(1, quantity); // Ensure minimum quantity is 1
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Function to get all cart items
export const getCartItems = (): Products[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

// Function to clear the cart (after order placement)
export const clearCart = (): void => {
  localStorage.removeItem("cart");
};
