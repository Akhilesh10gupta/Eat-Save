import React, { useState } from "react";
import Nav2 from "../components/Header/Nav2";
import Heading from "../components/Header/Heading";
import Footer from "../components/Footer/Footer";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

function RequestForm() {
  const [step, setStep] = useState(1); // Step 1 = User Info, Step 2 = Request Details

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />

        {/* Page Title */}
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {step === 1 ? "Request Food" : "Request Details"}
          </h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        {/* FORM CONTAINER */}
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            {step === 1 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Your Details
                </h2>

                <div className="mx-7">
                  <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                  <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4">
                    <span className="mr-2">+91</span>
                    <input type="text" placeholder="Phone Number" className="w-full outline-none bg-transparent" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                  <input type="text" placeholder="Pickup Location" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                  <div className="relative">
                    <input type="text" placeholder="Preferred Pickup Time" className="w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none" />
                    <FaCalendarAlt className="absolute right-4 top-4 text-gray-400" />
                  </div>
                </div>

                <div className="mx-7 mt-6">
                  <button onClick={() => setStep(2)} className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Next &gt;&gt;
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Request Details
                </h2>

                <div className="mx-7">
                  <input type="number" placeholder="How many people are you requesting for?" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                  <select className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none">
                    <option>Type of Food Preferred</option>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Any</option>
                  </select>
                  <input type="text" placeholder="Dietary Restrictions (if any)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" />
                  <textarea placeholder="Additional Message to Donor (optional)" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none" rows="3"></textarea>
                </div>

                <div className="mx-7">
                  <button className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Submit Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default RequestForm;
