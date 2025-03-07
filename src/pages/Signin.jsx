import React from 'react';
import Nav from '../components/Header/Nav';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import { FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Signin() {
  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />

        {/* Welcome Text Section */}
        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Welcome To Extra Bite</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        {/* Sign In Container */}
        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
            {/* Sign In Title */}
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">
              Sign In
            </h2>

            {/* Phone Input */}
            <div className=" flex items-center border border-gray-300 rounded-lg p-3   mb-4 mx-7">
              <span className="mr-2">🇮🇳</span>
              <span className="mr-2">+91</span>
              <input
                type="text"
                placeholder="Phone"
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* OTP Button */}
            <div className='mx-7'>
              <button className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition ">
                Send One Time Password
              </button>
            </div>

            {/* OTP Input */}
            <div className='mx-7'>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg p-3 mt-4 mb-4 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Separator Line */}
            <div className='mx-7'>
              <hr className="my-4 border-gray-300" />
            </div>

            {/* Continue with Email Button */}
            <div className='mx-7'>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg mt-4 font-semibold hover:bg-gray-100 transition">
                <FaEnvelope className="text-lg" /> Continue With Email
              </button>
            </div>

            {/* Sign in with Google Button */}
            <div className='mx-7'>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg mt-4 font-semibold hover:bg-gray-100 transition">
              <FcGoogle className="text-lg" /> Sign in with Google
            </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Signin;
