import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Nav2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-4 bg-transparent p-4 flex justify-between items-center w-full border-neutral-700/80 shadow-md backdrop-blur-md">
        <div className="container px-4 mx-auto flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img className="h-10 w-10 cursor-pointer" src={logo} alt="logo" />
            <Link to="/" className="text-lg font-semibold">
              <span className="text-orange-500 font-bold text-xl">Eat Save</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-orange-500 font-semibold text-lg">
              Home
            </Link>
            <Link to="/profile">
              <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👤</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-orange-500"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <Link
            to="/"
            className="text-orange-500 font-semibold text-xl mb-4"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default Nav2;