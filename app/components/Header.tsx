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
  username?: string;
  [key: string]: unknown;
}

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();
  const isBusiness = pathname.startsWith("/business");

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [cartCount, setCartCount] = useState(0);


  /* ================= SEARCH STATE hhh kkk ================= */

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchKey, setSearchKey] = useState("");

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);



  /* ================= SEARCH API ================= */

  const handleSearch = async (key: string) => {

    if (!key.trim()) {

      setSearchResults([]);
      return;

    }

    try {

      setSearchLoading(true);

      const res = await fetch(
        `https://goliteapi.golitemobile.com/search/v1/api/search?key=${encodeURIComponent(key)}`
      );

      const data = await res.json();

      if (data.status) {

        setSearchResults(data.data);

      } else {

        setSearchResults([]);

      }

    } catch (error) {

      console.error(error);
      setSearchResults([]);

    } finally {

      setSearchLoading(false);

    }

  };



  /* ================= CART ================= */

  useEffect(() => {

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

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);

  }, []);



  /* ================= AUTH ================= */

  useEffect(() => {

    const updateAuthState = () => {

      const token =
        localStorage.getItem("golite_accessToken") ||
        localStorage.getItem("golite_token");

      const userData = localStorage.getItem("user");

      if (token && userData) {

        setIsLoggedIn(true);
        setUser(JSON.parse(userData));

      } else {

        setIsLoggedIn(false);
        setUser(null);

      }

    };

    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    return () => window.removeEventListener("storage", updateAuthState);

  }, []);



  /* ================= OUTSIDE CLICK ================= */

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



  /* ================= LOGOUT ================= */

  const handleLogout = async () => {

    localStorage.removeItem("golite_accessToken");
    localStorage.removeItem("golite_token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setAccountOpen(false);

    router.push("/login");

  };



  return (

    <nav className="w-full border-b bg-white dark:bg-gray-900">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


        {/* LOGO */}

        <a href="/" className="flex items-center">

          <img src="/img/logo.png" className="h-10" />

        </a>



        {/* MENU */}

        <div className="hidden md:flex items-center gap-8">

          <a href="/prepaid-plans">Prepaid Plans</a>

          <a href="/postpaid-plans">Postpaid Plans</a>

          <a href="/shop-family-multi-line-plans">Family Plans</a>

          <a href="/business">Business Plans</a>

          <a href="/special-plans">Community Plans</a>

          <a href="/about-us">About</a>

        </div>



        {/* RIGHT */}

        <div className="flex items-center gap-5">


          {/* SEARCH ICON */}

          <Search
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-5 h-5 cursor-pointer"
          />



          {/* CART */}

          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/checkout")}
          >

            <ShoppingCart className="w-6 h-6" />

            {cartCount > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                {cartCount}

              </span>

            )}

          </div>



          {/* ACCOUNT */}

          {isLoggedIn ? (

            <div ref={dropdownRef} className="relative hidden md:block">

              <button onClick={() => setAccountOpen(!accountOpen)}>

                {user?.first_name || "Account"}

              </button>


              {accountOpen && (

                <div className="absolute right-0 mt-2 bg-white border rounded">

                  <button
                    onClick={() => router.push("/my-account")}
                    className="block px-4 py-2"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <button onClick={() => router.push("/login")}>

              Login

            </button>

          )}



          {/* MOBILE */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >

            {menuOpen ? <X /> : <Menu />}

          </button>


        </div>

      </div>



      {/* SEARCH BOX */}

{searchOpen && (
  <div className="absolute left-0 top-20 w-full flex justify-center z-50">
    
    <div className="w-[500px] bg-white shadow-2xl rounded-xl border p-4">

      {/* INPUT */}
      <input
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search plans, blogs..."
        className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* RESULTS */}
      <div className="mt-3 max-h-72 overflow-y-auto">

        {searchLoading && (
          <p className="text-sm text-gray-500 p-2">Searching...</p>
        )}

        {!searchLoading && searchResults.length === 0 && searchKey && (
          <p className="text-sm text-gray-500 p-2">No results found</p>
        )}

        {searchResults.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSearchOpen(false);

              if (item.type === "plan") {
                let slug = item.category_slug;

                if (slug === "family-plans") {
                  slug = "shop-family-multi-line-plans";
                } else if (slug === "business-plans") {
                  slug = "business";
                }

                router.push(`/${slug}`);
              }

              if (item.type === "blog") {
                router.push(`/blogs/${item.slug}`);
              }
            }}
            className="flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-sm">{item.title}</span>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                item.type === "plan"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>

  </div>
)}



    </nav>

  );

}