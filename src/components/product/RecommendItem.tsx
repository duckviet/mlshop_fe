import Image from "next/image";
import React from "react";

const RecommendItem = () => {
  return (
    <>
      <div className="relative max-w-xs rounded-lg overflow-hidden shadow-lg hover:cursor-pointer max-h-[350px] bg-white transform transition duration-300 ease-in-out hover:scale-105">
        <button className="text-gray-500 absolute top-2 right-3 bg-white rounded-full p-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4"
          >
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
          </svg>
        </button>
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Product"
          className="w-full h-48 object-cover"
          width={500} // Specify width
          height={192} // Specify height (adjust these values to match your layout needs)
          layout="responsive" // Ensures the image scales nicely
          objectFit="cover" // Similar to `object-cover` in Tailwind CSS
        />
        <div className="p-4 ">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Dolman T-Shirt 3/4 Sleeve</h2>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
            <span className="text-sm font-semibold">4.9</span>
            <span className="text-sm text-gray-500 ml-1">(225 reviews)</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-semibold">$122.00</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              $166.00
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendItem;
