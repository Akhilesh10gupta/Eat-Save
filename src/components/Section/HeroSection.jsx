import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <section className="md:pt-28 pt-15 pb-20 flex flex-col items-center text-center px-4 bg-transparent">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
        Save Food, Save Lives
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 max-w-2xl mt-4">
        Join our mission to reduce food waste and help those in need. Easily
        donate or request food in just a few clicks!
      </p>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <input
          type="text"
          placeholder="Enter your location"
          className="px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-80 sm:w-96 bg-transparent text-white placeholder-gray-400"
          style={{ backgroundColor: "transparent" }}
        />
        <button
          className="bg-[#FF7401] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Get Started
        </button>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-6 mt-8">
        {/* Request Food */}
        <button
          className="flex items-center gap-2 border-2 border-dashed border-orange-500 px-6 py-3 rounded-lg text-[#FF7401] hover:bg-[#FF7401] hover:text-white transition"
        >
          <FaCalendarAlt />
          Request Food
        </button>

        {/* Donate Food */}
        <button
          className="flex items-center gap-2 border-2 border-dashed border-orange-500 px-6 py-3 rounded-lg text-[#FF7401] hover:bg-[#FF7401] hover:text-white transition"
        >
          <FaHandHoldingHeart />
          <Link to="/DonateForm" className="text-lg font-semibold">Donate Food</Link>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
