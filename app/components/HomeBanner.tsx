"use client"

export default function HomeBanner() {
  return (
    <div className="h-screen w-full bg-[url('/img/banner/home-banner.png')] bg-cover bg-center bg-no-repeat flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-6xl text-white font-bold mb-4">Experience 5G in India GoLite: Go Green!</h1>
        <p className="text-lg text-white">Discover innovative 5G connectivity, sustainable plans, and immersive tools designed to enhance your lifestyle. Explore GoLite&apos;s commitment to a greener future and a smarter digital world</p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/plans"
            aria-label="Shop Sustainable Plans"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md shadow-md"
          >
            shop Sustainable Plans
          </a>

          <a
            href="/stores"
            aria-label="Find Store Nearby"
            className="inline-block border border-white text-white bg-transparent hover:bg-white/10 font-semibold px-3 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md"
          >
            Find Store Nearby
          </a>
        </div>
      </div>
    </div>
  );
}