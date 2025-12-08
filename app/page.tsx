import TopBar from "./components/TopBar";
import HomeBanner from "./components/HomeBanner";
import CoverageArea from "./components/CoverageArea";

export default function Home() {
  return (
    <>
    <TopBar />
    <HomeBanner />
    {/* <CoverageArea /> */}
     <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Manage Your Mobile Needs with Ease
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need in one powerful platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 text-2xl">📄</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Recharge & Bill Pay
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Quick and secure payments with instant confirmation
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-blue-500 text-2xl">🔄</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Switch To GoLite
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Make the smart move today and switch from any network to GoLite
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-500 text-2xl">📲</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              SIM Activation
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Activate GoLite SIM instantly and step into seamless connectivity
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-green-500 text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Shop Mobile
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Find your perfect mobile device and enhance connectivity with GoLite.
            </p>
          </div>

        </div>
      </div>
    </section>


    <section className="w-full bg-[#11A683] text-white py-16 relative overflow-hidden">

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Stay Connected Anywhere with Affordable Prepaid Travel Plans!
        </h2>

        {/* Feature List */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white text-lg">
          <p className="flex items-center gap-2">
            <span className="text-green-300 text-2xl">✔</span>
            Free Talk & Text
          </p>

          <p className="flex items-center gap-2">
            <span className="text-green-300 text-2xl">✔</span>
            Mobile Hotspot Access
          </p>

          <p className="flex items-center gap-2">
            <span className="text-green-300 text-2xl">✔</span>
            Unlimited 5G Data
          </p>

          <p className="flex items-center gap-2">
            <span className="text-green-300 text-2xl">✔</span>
            24 × 7 Customer Support
          </p>

          <p className="flex items-center gap-2">
            <span className="text-green-300 text-2xl">✔</span>
            FREE Roaming Canada & Mexico
          </p>
        </div>

        {/* Button */}
        <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-xl">
          View Plans
        </button>

      </div>

      {/* Bottom Landmark Image */}
      <div className="w-full mt-12 flex justify-center">
        <img
          src="/img/travelplansection.png"
          alt="World Landmarks"
          className="w-full max-w-5xl pointer-events-none select-none"
        />
      </div>

    </section>
    </>
  );
}
