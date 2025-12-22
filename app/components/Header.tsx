"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const loginbutton = () => {
    router.push('/login');
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="text-xl font-bold text-orange-500 cursour-pointer">
          <img
            src="img/logo.png"    // <-- replace with your image path
            alt="GoLite Logo"
            className="h-10"
          />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-gray-600">
          <a href="/all-plans" className="hover:text-black">Plans</a>
          <a href="/devices" className="hover:text-black">Devices</a>
          <a href="/coverage" className="hover:text-black">Coverage</a>
          <a href="/support" className="hover:text-black">Support</a>
          <a href="/about-us" className="hover:text-black">About</a>
        </div>

        {/* Login Button */}
        <button onClick={loginbutton} className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition cursor-pointer">
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
          <a href="/all-plans" className="block">Plans</a>
          <a href="/devices" className="block">Devices</a>
          <a href="/coverage" className="block">Coverage</a>
          <a href="/support" className="block">Support</a>
          <a href="/about" className="block">About</a>
          <button onClick={loginbutton} className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
