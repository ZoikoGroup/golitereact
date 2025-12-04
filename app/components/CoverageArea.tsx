"use client"

export default function CoverageArea() {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto -px-4 flex flex-row items-center -mt-20 bg-white shadow-lg rounded-lg">
        <img src="/img/5g.png" alt="Coverage Map" className="w-1/3 h-auto mr-8 -mt-12" />
        <div className="items-center">
            <h2 className="text-3xl font-semibold mb-4">Check 5G Coverage in Your Area</h2>
            <p className="text-gray-700 mb-4">
            Find out where GoLite&apos;s reliable and fast 5G network is available with our detailed interactive map
            </p>
            <a
              href="https://www.att.com/idpmaps/reseller"
              aria-label="View Coverage Map"
              className="inline-block border border-orange-600 text-orange-600 bg-transparent hover:bg-white/10 font-semibold px-3 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md"
            >
            View Coverage Map
          </a>
        </div>
      </div>
    </div>
  );
}