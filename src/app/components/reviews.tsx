import React from "react";

const Reviews = () => {
  const reviews = [
    {
      name: "Michael B.",
      date: "January 5, 2024",
      text: "This pullover hoodie is incredibly warm and stylish. The fabric is soft, and the fit is perfect for winter. Highly recommend!",
      rating: 5,
    },
    {
      name: "Daniel S.",
      date: "January 10, 2024",
      text: "The jacket is amazing! It keeps me warm during chilly evenings and looks great with any outfit. The quality is top-notch.",
      rating: 5,
    },
    {
      name: "Chris W.",
      date: "January 12, 2024",
      text: "I love this men's shirt! The material is comfortable and breathable. It’s perfect for both casual and formal wear.",
      rating: 5,
    },
    {
      name: "James P.",
      date: "January 15, 2024",
      text: "Great hoodie! It’s lightweight yet warm, and the design is just perfect. I’ve received so many compliments.",
      rating: 5,
    },
    {
      name: "Robert T.",
      date: "January 18, 2024",
      text: "Absolutely love this jacket! It has the perfect balance of warmth and style. Definitely worth the purchase!",
      rating: 5,
    },
    {
      name: "David M.",
      date: "January 20, 2024",
      text: "This shirt fits like a dream. The stitching and fabric quality are outstanding. Would definitely buy again!",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4 mb-6">
        <div className="border-b border-gray-300 pb-4 flex justify-between items-center">
          <button className="text-gray-600 hover:text-black">All Products</button>
          <button className="text-gray-600 hover:text-black">Rating & Reviews</button>
          <button className="text-gray-600 hover:text-black">FAQs</button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Reviews (451)</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300">
              Latest
            </button>
            <button className="bg-neutral-900 text-white px-4 py-2 rounded hover:bg-blue-600">
              Write a Review
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="gold"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-800 font-medium">{review.text}</p>
              <p className="mt-4 text-sm text-gray-500">
                {review.name} - <span>{review.date}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-neutral-100 text-black border px-6 py-2 rounded hover:bg-neutral-400 transition">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
