import React from "react";

const HeroSection2 = () => {
  return (
    <div className="bg-orange-500 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-10">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Save Food, Save Lives
        </h1>
        <p className="text-lg md:text-xl font-semibold text-white mt-2">
          Your excess food can feed the hungry.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center">
          <input
            type="text"
            placeholder="Enter your location"
            className="px-4 py-2 w-full md:w-80 border rounded-md focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-md mt-3 md:mt-0 md:ml-3">
            Get Started
          </button>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button className="bg-red-600 text-white px-6 py-2 rounded-md">Donate Food</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">Collect Food</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Request Food</button>
        </div>
      </div>
      
      {/* Right Section - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src="/path-to-your-image.jpg"
          alt="Food Donation"
          className="w-full md:w-96 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection2;