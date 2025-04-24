import React from 'react';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import { FaEnvelope, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Nav2 from '../components/Header/Nav2';

function EditProfile() {
  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav2 />

        {/* Page Title */}
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Edit Your Profile</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        {/* Edit Profile Container */}
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">

            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">
              Profile Information
            </h2>

            {/* Full Name */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaPhone className="mr-2 text-gray-500" />
              <span className="mr-2">+91</span>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Address */}
            <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-4 mx-7">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Address"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Save Changes Button */}
            <div className="mx-7 mt-4">
              <button className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Save Changes
              </button>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default EditProfile;
