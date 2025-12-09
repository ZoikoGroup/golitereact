import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import PlanSlider from "./components/PlanSlider";
import TestimonialSlider from "./components/TestimonialSlider";
import BlogSection from "./components/BlogSection";
import FaqHome from "./components/FaqHome";
import Footer from "./components/Footer";
export default function Home() {
  const cards = [
    {
      title: "Student Connect+",
      desc: "Special discounts for students with edu email verification",
      badge: "NEW",
      gradient: "from-blue-500 via-purple-500 to-indigo-500",
    },
    {
      title: "Senior Saver",
      desc: "Simplified plans with dedicated support for seniors 60+",
      gradient: "from-pink-400 via-red-400 to-orange-400",
    },
    {
      title: "Work-Life Unlimited",
      desc: "Business features with personal benefits in one plan",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: "Family Bundle",
      desc: "Connect up to 5 lines with shared data and savings",
      gradient: "from-green-400 to-teal-400",
    },
    {
      title: "Gamer's Paradise",
      desc: "Low latency 5G with priority bandwidth for gaming",
      gradient: "from-red-400 via-orange-300 to-yellow-300",
    },
    {
      title: "Traveler's Choice",
      desc: "International roaming in 200+ countries included",
      gradient: "from-indigo-500 via-purple-500 to-blue-500",
    },
  ];
  return (
    <>
    <Header />
    <HomeBanner />
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

    <PlanSlider/>



    <section className="w-full py-14 bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Premium Mobile Brands at <br /> Affordable Prices
        </h2>
        <p className="text-gray-500 mt-2">
          Get the latest smartphones with exclusive GoLite discounts
        </p>
      </div>

      {/* Image Box */}
      <div className="w-full flex justify-center">
        <div className="bg-white shadow-sm rounded-3xl p-6 max-w-5xl w-full">
          <div className="border-2 border-blue-300 rounded-xl flex justify-center items-center p-4">
            <img
              src="/img/mobilesHome.png" 
              alt="mobile"
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Brand Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-4">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">SAMSUNG</button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold">OnePlus</button>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold">Apple</button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">realme</button>
        <button className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">Google</button>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">OPPO</button>
      </div>

      {/* Browse Button */}
      <div className="flex justify-center mt-10">
        <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold shadow">
          Browse All Devices
        </button>
      </div>
    </section>

    <section className="w-full py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Plans for Your Lifestyle
        </h2>
        <p className="text-gray-500 mt-2">
          Tailored solutions for every need
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-20">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${c.gradient}`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              {c.badge && (
                <span className="text-xs font-semibold bg-white/30 backdrop-blur px-3 py-1 rounded-full">
                  {c.badge}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm opacity-90">{c.desc}</p>

            <a
              href="#"
              className="mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline"
            >
              View Plans →
            </a>
          </div>
        ))}
      </div>
    </section>
    <TestimonialSlider/>
    <BlogSection/>
    <FaqHome/>
    <Footer/>
    </>
  );
}
