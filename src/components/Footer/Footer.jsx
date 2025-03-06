import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from '../../assets/logo.png' 

function Footer() {
  return (
    <div className="bg-[#E87730] text-white py-6 px-10">
      
      {/* Meals Donated */}
      <div className="text-m font-bold mt-4 md:mt-0 ml-auto" style={{ textAlign: "right" }}>
          Total Meals Donated: <span className="text-black text-lg">13342 +</span>
        </div>

    <div className="bg-[#E87730] text-white  flex flex-col items-center">
      {/* Logo and Links */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <span className="text-2xl mr-2"><img className="h-10 w-10 mr-2 cursor-pointer" src={logo} alt="logo" />
            </span> {/* logo  */}
          Eat Save
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            About us
          </a>
          <a href="#" className="hover:underline">
            Source
          </a>
          <a href="#" className="hover:underline">
            Help & Support
          </a>
          <a href="#" className="hover:underline">
            T&C
          </a>
        </div>
        {/* Contact Info */}
        <div className="text-sm font-semibold " style={{ }}>
            Contact: <span className="text-white">+91 1234567899</span>
          </div>
        


      </div>

      {/* Social Media and Contact */}
      <div className="flex justify-center items-center w-full max-w-6xl mt-6">
        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-lg hover:text-black">
            <FaFacebookF />
          </a>
          <a href="#" className="text-lg hover:text-black">
            <FaInstagram />
          </a>
          <a href="#" className="text-lg hover:text-black">
            <FaTwitter />
          </a>
        </div>

        
      </div>
    </div>
    </div>
    
  );
}

export default Footer;
