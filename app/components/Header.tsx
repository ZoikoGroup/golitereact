"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface UserData {
  name?: string;
  first_name?: string;
  [key: string]: unknown;
}

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartCount = 3;

  /* ---------- AUTH STATE ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("golite_accessToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  /* ---------- CHUNK ERROR FIX ---------- */
  useEffect(() => {
    const handleChunkError = (e: ErrorEvent) => {
      if (e.message?.includes("ChunkLoadError")) {
        window.location.reload();
      }
    };
    window.addEventListener("error", handleChunkError);
    return () => window.removeEventListener("error", handleChunkError);
  }, []);

  /* ---------- OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------- LOGOUT (FIXED) ---------- */
  const handleLogout = () => {
    localStorage.removeItem("golite_accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setAccountOpen(false);
    router.replace("/login");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-10" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <a href="/prepaid" className="hover:text-black">Prepaid Plans</a>
          <a href="/postpaid" className="hover:text-black">Postpaid Plans</a>
          <a href="/family-plans" className="hover:text-black">Family Plans</a>
          <a href="/special-plans" className="hover:text-black">Special Plans</a>
          <a href="/devices" className="hover:text-black">Devices</a>
          <a href="https://www.att.com/idpmaps/reseller" className="hover:text-black">Coverage</a>
          <a href="/support" className="hover:text-black">Support</a>
          <a href="/about-us" className="hover:text-black">About</a>
        </div>
        {isLoggedIn && (
          <p className="text-sm text-gray-500 block lg:hidden  xl:hidden  md:hidden">
            Hi, <span className="font-medium">{user?.first_name || (typeof user?.username === 'string' ? user.username : 'User')}</span>
          </p>
        )}
        {/* Right Actions */}
        <div className="flex items-center gap-5">

          <Search className="w-5 h-5 cursor-pointer text-gray-700" />

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Desktop Auth Menu */}
          {isLoggedIn ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 font-medium"
              >
                <User className="w-5 h-5" />
                {user?.first_name || "Account"}
                <ChevronDown className="w-4 h-4" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hidden md:block bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">
          <a href="/prepaid" className="block">Prepaid Plans</a>
          <a href="/postpaid" className="block">Postpaid Plans</a>
          <a href="/family-plans" className="block">Family Plans</a>
          <a href="/special-plans" className="block">Special Plans</a>
          <a href="/devices" className="block">Devices</a>
          <a href="https://www.att.com/idpmaps/reseller" className="block">Coverage</a>
          <a href="/support" className="block">Support</a>

          {isLoggedIn ? (
            <>
              <button onClick={() => router.push("/dashboard")} className="block w-full text-left">
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
