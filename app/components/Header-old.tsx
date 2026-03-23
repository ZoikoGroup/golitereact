"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
 // ✅ Hooks must be here
  const router = useRouter();
  const pathname = usePathname();
  const isBusiness = pathname.startsWith("/business");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
 const [cartCount, setCartCount] = useState(0);

  /* ---------- AUTH STATE ---------- */
  useEffect(() => {
  if (typeof window === "undefined") return;

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!Array.isArray(cart)) {
        setCartCount(0);
        return;
      }

      const count = cart.reduce(
        (total, item) => total + Number(item?.formData?.priceQty ?? 1),
        0
      );

      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  // Initial load
  updateCartCount();

  // Sync across tabs / popup → checkout → header
  window.addEventListener("storage", updateCartCount);

  return () => window.removeEventListener("storage", updateCartCount);
}, []);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateAuthState = () => {
      const token = localStorage.getItem("golite_accessToken") || localStorage.getItem("golite_token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Initial
    updateAuthState();

    // Update across tabs/popups and after popup login
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'golite_token' || e.key === 'golite_accessToken' || e.key === 'user') {
        updateAuthState();
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
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
  const handleLogout = async () => {
    // clear all known local tokens
    localStorage.removeItem("golite_accessToken");
    localStorage.removeItem("golite_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setAccountOpen(false);

    try {
      // clear NextAuth session and redirect to /login
      await (await import('next-auth/react')).signOut({ callbackUrl: '/login' });
    } catch (e) {
      // fallback redirect
      router.replace('/login');
    }
  };

  return (
    <nav className="w-full border-b bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-10" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300">
          <a href="/prepaid" className="hover:text-black dark:hover:text-white">Prepaid Plans</a>
          <a href="/postpaid" className="hover:text-black dark:hover:text-white">Postpaid Plans</a>
          <a href="/family-plans" className="hover:text-black dark:hover:text-white">Family Plans</a>
          <a href="/business" className="hover:text-black dark:hover:text-white">Business Plans</a>
          <a href="/community-plans" className="hover:text-black dark:hover:text-white">Community Plans</a>
          {/* <a href="/devices" className="hover:text-black">Devices</a> */}
          <a href="https://www.att.com/idpmaps/reseller" className="hover:text-black">Coverage</a>
          {/* <a href="/support" className="hover:text-black">Support</a> */}
          <a href="/about-us" className="hover:text-black">About</a>
        </div>
        {isLoggedIn && (
          <p className="text-sm text-gray-500 dark:text-gray-300 block lg:hidden  xl:hidden  md:hidden">
            Hi, <span className="font-medium">{user?.first_name || (typeof user?.username === 'string' ? user.username : 'User')}</span>
          </p>
        )}
        {/* Right Actions */}
        <div className="flex items-center gap-5">

          <Search className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300" />

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/checkout")}
          >
            <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-gray-300" />
            {cartCount > 0 && (
              <span className={`absolute -top-2 -right-2  text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
              
              ${isBusiness ? 'bg-green-500' : 'bg-red-500'}
              `}>
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
                {user?.first_name || " My Account"}
                <ChevronDown className="w-4 h-4" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-900 border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => router.push("/my-account")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100  dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`hidden md:block  text-white px-5 py-2 rounded-lg  ${isBusiness ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}`}
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
          <a href="/business" className="block">Business Plans</a>
          <a href="/community-plans" className="block">Community Plans</a>
          {/* <a href="/devices" className="block">Devices</a> */}
          <a href="https://www.att.com/idpmaps/reseller" target="_blank" className="block">Coverage</a>
          {/* <a href="/support" className="block">Support</a> */}

          {isLoggedIn ? (
            <>
              <button onClick={() => router.push("/my-account")} className="block w-full text-left">
                My Account
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
