"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function HomeBanner() {
  const router = useRouter();
  
  const allplans = () => {
    router.push('/all-plans');
  };
  const coverage = () => {
    router.push('https://www.att.com/idpmaps/reseller');
  };
  
  const [country, setCountry] = useState("USA");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.country_name) {
          setCountry(data.country_name);
        }
      })
      .catch(() => setCountry("USA"));
  }, []);


  return (
    
<section className="w-full bg-gradient-to-r from-[#6C63FF] to-[#4A90E2] dark:from-[#1E1E2F] dark:to-[#121212] text-white overflow-hidden">

      <div className="max-w-full grid md:grid-cols-2 gap-0 items-center">

        {/* LEFT CONTENT */}
        <div className="px-6  md:px-16 md:py-0">
          <span className="inline-block bg-white/20 dark:text-gray-300 text-white text-xs mt-4 font-semibold px-4 py-1 rounded-full mb-4 md:text-[1vw]">
            5G NETWORK NOW LIVE
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight md:text-[3vw] dark:text-gray-400">
            Experience 5G in {country}
          </h1>

          <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400 mt-2 md:text-[2vw]">
            GoLite: Go Green!
          </h2>

          <p className="text-white/90 mt-4 leading-relaxed text-sm md:text-base md:text-[1.2vw]">
            Join India&apos;s fastest-growing eco-conscious mobile network.
            Lightning-fast 5G speeds, sustainable practices, and unbeatable value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={allplans} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold [@media(min-width:640px)_and_(max-width:768px)]:w-1/2  md:text-[1vw] cursor-pointer">
              Explore Plans
            </button>

            <button onClick={coverage} className="border border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold [@media(min-width:640px)_and_(max-width:768px)]:w-1/2  md:text-[1vw]">
              Check Coverage
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-end h-full">
          <img 
            src="/img/resize/homebanner.jpeg" 
            alt="People using mobile" 
            className="w-full h-full object-cover object-left"
          />
        </div>

      </div>
    </section>
  );
}