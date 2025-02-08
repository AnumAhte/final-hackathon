"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { Products } from "@/types/products";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { client } from "@/sanity/lib/client"; // Import Sanity client

type FormFields = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  shipmentMethod: string; // New field for shipping
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormFields>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    shipmentMethod: "Standard Shipping", // Default shipping method
  });

  const [formErrors, setFormErrors] = useState<Partial<FormFields>>({});

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.inventory || 1),
    0
  );

  // Shipping cost logic
  const shippingCost = formValues.shipmentMethod === "Express Shipping" ? 10 : 0;
  const total = Math.max(subtotal - discount + shippingCost, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id in formValues) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors: Partial<FormFields> = {};
    (Object.keys(formValues) as (keyof FormFields)[]).forEach((key) => {
      if (!formValues[key].trim()) {
        errors[key] = `${key} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      const orderData = {
        _type: "order",
        customerName: `${formValues.firstName} ${formValues.lastName}`,
        address: formValues.address,
        city: formValues.city,
        zipCode: formValues.zipCode,
        phone: formValues.phone,
        email: formValues.email,
        shipmentMethod: formValues.shipmentMethod, // Include shipping method
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.inventory,
          price: item.price,
        })),
        totalAmount: total,
        status: "pending", // Default order status
      };

      console.log("Order Data:", orderData);

      try {
        const newOrder = await client.create(orderData);
        console.log("Order Created in Sanity:", newOrder);

        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear cart
        localStorage.removeItem("appliedDiscount");
        setCartItems([]); // Clear cart state
      } catch (error) {
        console.error("Sanity Order Error:", error);
        alert("Failed to process order. Please try again.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link href="/cart" className="text-gray-600 hover:text-black text-sm">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
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
                    <p className="text-xs text-gray-500">Quantity: {item.inventory}</p>
                  </div>
                  <p className="text-sm font-medium">${item.price * (item.inventory || 1)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-sm">
                Shipping: <span className="font-medium">${shippingCost}</span>
              </p>
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Other form fields */}
              {Object.keys(formValues).map((key) =>
                key !== "shipmentMethod" ? (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      id={key}
                      placeholder={`Enter your ${key}`}
                      value={formValues[key as keyof FormFields]}
                      onChange={handleInputChange}
                      className="border p-2 w-full rounded mt-1"
                    />
                  </div>
                ) : null
              )}

              {/* Shipping Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Method</label>
                <select id="shipmentMethod" value={formValues.shipmentMethod} onChange={handleInputChange} className="border p-2 w-full rounded mt-1">
                  <option value="Standard Shipping">Standard Shipping (Free)</option>
                  <option value="Express Shipping">Express Shipping ($10)</option>
                </select>
              </div>
            </div>
            <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
