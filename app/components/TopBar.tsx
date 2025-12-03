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

      {/* new: orange logo bar */}
      <div className="w-full bg-orange-500 text-white">
        <div className="h-14 max-w-6xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            {/* replace /logo.svg with your logo path */}
            <img src="/img/mainlogo.png" alt="Logo" className="h-10 md:h-12 w-auto" />
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <a className="hover:underline">Prepaid Plans</a>
            <a className="hover:underline">Postpaid Plans</a>
            <a className="hover:underline">Family Plans</a>
            <a className="hover:underline">Phones</a>
            <a className="hover:underline">Special Plans</a>
          </nav>

          {/* mobile menu toggle for logo bar */}
          <div className="md:hidden">
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
            <div className="max-w-6xl mx-auto px-4 py-2 space-y-2 text-white">
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