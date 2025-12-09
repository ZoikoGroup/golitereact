"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="img/logo.png"    // <-- replace with your image path
            alt="GoLite Logo"
            className="h-10"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-600">
          <a href="#" className="hover:text-black">Plans</a>
          <a href="#" className="hover:text-black">Devices</a>
          <a href="#" className="hover:text-black">Coverage</a>
          <a href="#" className="hover:text-black">Support</a>
          <a href="#" className="hover:text-black">About</a>
        </div>

        {/* Login Button */}
        <button className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition">
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-gray-700">
          <a href="#" className="block">Plans</a>
          <a href="#" className="block">Devices</a>
          <a href="#" className="block">Coverage</a>
          <a href="#" className="block">Support</a>
          <a href="#" className="block">About</a>

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
