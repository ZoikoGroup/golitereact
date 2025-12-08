"use client"

export default function HomeBanner() {
  return (
    // <div className="h-screen w-full bg-[url('/img/banner/home-banner.png')] bg-cover bg-center bg-no-repeat flex items-center">
    //   <div className="w-full max-w-4xl mx-auto px-4 text-center">
    //     <h1 className="text-6xl text-white font-bold mb-4">Experience 5G in India GoLite: Go Green!</h1>
    //     <p className="text-lg text-white">Discover innovative 5G connectivity, sustainable plans, and immersive tools designed to enhance your lifestyle. Explore GoLite&apos;s commitment to a greener future and a smarter digital world</p>

    //     <div className="mt-8 flex justify-center gap-4">
    //       <a
    //         href="/plans"
    //         aria-label="Shop Sustainable Plans"
    //         className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md shadow-md"
    //       >
    //         Shop Sustainable Plans
    //       </a>

    //       <a
    //         href="/stores"
    //         aria-label="Find Store Nearby"
    //         className="inline-block border border-white text-white bg-transparent hover:bg-white/10 font-semibold px-3 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-md"
    //       >
    //         Find Store Nearby
    //       </a>
    //     </div>
    //   </div>
    // </div>

    <section className="w-full bg-gradient-to-r from-[#6C63FF] to-[#4A90E2] text-white py-16">
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
            5G NETWORK NOW LIVE
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Experience 5G in India
          </h1>

          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mt-2">
            GoLite: Go Green!
          </h2>

          <p className="text-white/90 mt-4 leading-relaxed">
            Join India's fastest-growing eco-conscious mobile network.
            Lightning-fast 5G speeds, sustainable practices, and unbeatable value.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
              Explore Plans
            </button>

            <button className="border border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold">
              Check Coverage
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img 
            src="/img/homebanner.png" 
            alt="People using mobile" 
            className=""
          />
        </div>

      </div>
    </section>
  );
}