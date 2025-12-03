"use client";
import { useState } from "react";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);

  return (
    <div>
      <div className="w-full bg-gray-100">
        <div className="h-12 max-w-6xl mx-auto flex items-center justify-between px-4">
          {/* desktop left */}
          <div className="text-gray-600 hidden sm:block">
            Personal | Business
          </div>

          {/* desktop right */}
          <div className="text-gray-600 hidden sm:block text-right">
            Coverage Map | BYOD | Travel Plans | Top-Up | International Calls | Device Protection | Help &amp; Support
          </div>

          {/* mobile: show left label and hamburger */}
          <div className="flex items-center sm:hidden w-full justify-between">
            <div className="text-gray-600">
              Personal | Business
            </div>
            <button
              aria-label="Toggle top menu"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-200"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        {open && (
          <div className="sm:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 py-2 text-gray-700 space-y-2">
              <div>Coverage Map</div>
              <div>BYOD</div>
              <div>Travel Plans</div>
              <div>Top-Up</div>
              <div>International Calls</div>
              <div>Device Protection</div>
              <div>Help &amp; Support</div>
            </div>
          </div>
        )}
      </div>

      {/* new: orange logo bar (sticky) */}
      <div className="w-full bg-orange-500 text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="h-16 md:h-20 max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            {/* replace /logo.svg with your logo path */}
            <img
              src="/img/mainlogo.png"
              alt="Logo"
              className="h-14 md:h-16 lg:h-20 w-auto my-1 md:my-2 lg:my-3"
            />
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <a className="hover:underline">Prepaid Plans</a>
            <a className="hover:underline">Postpaid Plans</a>
            <a className="hover:underline">Family Plans</a>
            <a className="hover:underline">Phones</a>
            <a className="hover:underline">Special Plans</a>
          </nav>

          {/* desktop: search, notification, cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-black placeholder-gray-200 text-sm focus:outline-none w-32"
              />
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button aria-label="Notifications" className="p-2 hover:bg-orange-600 rounded-md relative">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button aria-label="Shopping Cart" className="p-2 hover:bg-orange-600 rounded-md relative">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>
            <button aria-label="My Profile" className="p-2 hover:bg-orange-600 rounded-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* mobile menu toggle for logo bar */}
          <div className="md:hidden flex items-center space-x-2">
            <button aria-label="Notifications" className="p-2 hover:bg-orange-600 rounded-md relative">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </button>
            <button aria-label="Shopping Cart" className="p-2 hover:bg-orange-600 rounded-md relative">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
            </button>
            <button aria-label="My Profile" className="p-2 hover:bg-orange-600 rounded-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button
              aria-label="Toggle main menu"
              className="p-2 rounded-md hover:bg-orange-600"
              onClick={() => setLogoOpen((v) => !v)}
            >
              {logoOpen ? (
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* mobile dropdown for logo bar */}
        {logoOpen && (
          <div className="md:hidden border-t border-orange-400">
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
              <div className="flex items-center bg-white bg-opacity-20 rounded-md px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-black placeholder-gray-200 text-sm focus:outline-none flex-1"
                />
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>Prepaid Plans</div>
              <div>Postpaid Plans</div>
              <div>Family Plans</div>
              <div>Phones</div>
              <div>Special Plans</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}