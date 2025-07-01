import React, { useState } from "react";
import Nav2 from "../components/Header/Nav2";
import Heading from "../components/Header/Heading";
import Footer from "../components/Footer/Footer";
import { FaSearch, FaCalendarAlt, FaUpload } from "react-icons/fa";

function DonationForm() {
  const [step, setStep] = useState(1); // Step 1 = Donor Details, Step 2 = Food Details

  

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />

        {/* Page Title */}
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {step === 1 ? "Donate Food" : "Food Details"}
          </h1>
          <div className="w-full border-t-2 border-[#FF7401] mt-1"></div>
        </div>

        {/* FORM CONTAINER */}
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
            
            {/* Step 1: Donor Details */}
            {step === 1 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Donor Detail
                </h2>

                <div className="mx-7">
                  <input type="text" placeholder="Donor Full Name" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
                  <span className="mr-2">+91</span>
                  <input type="text" placeholder="Phone" className="w-full outline-none bg-transparent text-sm sm:text-base" />
                </div>

                <div className="mx-7">
                  <input type="email" placeholder="Donor Email" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="relative mx-7">
                  <input type="text" placeholder="Pickup Address" className="w-full border border-gray-300 rounded-lg p-3 pr-10 mb-4 outline-none text-sm sm:text-base" />
                  <FaSearch className="absolute right-4 top-4 text-gray-400" />
                </div>

                <div className="relative mx-7">
                  <input type="text" placeholder="Preferred Pickup Time" className="w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none text-sm sm:text-base" />
                  <FaCalendarAlt className="absolute right-4 top-4 text-gray-400" />
                </div>

                <div className="mx-7 mt-6">
                  <button onClick={() => setStep(2)} className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Next &gt;&gt;
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Food Details */}
            {step === 2 && (
              <>
                <h2 className="text-center text-xl sm:text-2xl font-bold text-[#FF7401] mb-6">
                  Food Details
                </h2>

                <div className="mx-7">
                  <select className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base">
                    <option>Food Type</option>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                  </select>
                </div>

                <div className="mx-7">
                  <input type="text" placeholder="Food Name" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="mx-7">
                  <input type="text" placeholder="Quantity & Weight" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="mx-7">
                  <input type="text" placeholder="Storage Requirements" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="relative mx-7">
                  <input type="text" placeholder="Best Before" className="w-full border border-gray-300 rounded-lg p-3 pr-10 mb-4 outline-none text-sm sm:text-base" />
                  <FaCalendarAlt className="absolute right-4 top-4 text-gray-400" />
                </div>

                <div className="relative mx-7">
                  <input type="file" placeholder="Upload Image" className="w-full border border-gray-300 rounded-lg p-3 pr-10 mb-4 outline-none text-sm sm:text-base" />
                  <FaUpload className="absolute right-4 top-4 text-gray-400" />
                </div>

                <div className="mx-7">
                  <input type="text" placeholder="Additional Details" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="mx-7">
                  <select className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base">
                    <option>Donation Type</option>
                    <option>Cooked Food</option>
                    <option>Raw Ingredients</option>
                  </select>
                </div>

                <div className="mx-7">
                  <input type="text" placeholder="Min. Contri. Amount" className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none text-sm sm:text-base" />
                </div>

                <div className="flex items-center mx-7 mb-4">
                  <input type="checkbox" className="mr-2" />
                  <p className="text-sm">
                    I confirm donation{" "}
                    <a href="#" className="text-blue-500">terms & conditions</a>.
                  </p>
                </div>

                <div className="mx-7">
                  <button className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Submit
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

export default DonationForm;
