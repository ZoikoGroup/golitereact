"use client"

export default function HomeBanner() {
  return (
    

    <section className="w-full bg-gradient-to-r from-[#6C63FF] to-[#4A90E2] text-white">
      <div className="container  grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="mx-auto px-8 md:px-20">
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
        <div className="flex  md:justify-end">
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