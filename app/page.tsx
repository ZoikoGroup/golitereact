"use client";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import PlanSlider from "./components/PlanSlider";
import TestimonialSlider from "./components/TestimonialSlider";
import BlogSection from "./components/BlogSection";
import FaqHome from "./components/FaqHome";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();

  const allplans = () => {
    router.push('/all-plans');
  };
  const cards = [
    {
      title: "Student Connect+",
      desc: "Special discounts for students with edu email verification",
      badge: "NEW",
      gradient: "from-[#667EEA] to-[#764BA2]",
      href: "/students-discount-application",
    },
    {
      title: "Senior Saver",
      desc: "Simplified plans with dedicated support for seniors 60+",
      gradient: "from-[#F093FB] to-[#F5576C]",
      href: "/senior-citizen-discount-enrollment-form",
    },
    {
      title: "Work-Life Unlimited",
      desc: "Business features with personal benefits in one plan",
      gradient: "from-[#4FACFE] to-[#00F2FE]",
       href: "/business",
    },
    {
      title: "Family Bundle",
      desc: "Connect up to 5 lines with shared data and savings",
      gradient: "from-[#43E97B] to-[#38F9D7]",
       href: "/family-plans",
    },
    {
      title: "Gamer's Paradise",
      desc: "Low latency 5G with priority bandwidth for gaming",
      gradient: "from-[#FA709A] to-[#FEE140]",
       href: "#",
    },
    {
      title: "Traveler's Choice",
      desc: "International roaming in 200+ countries included",
      gradient: "from-[#30CFD0] to-[#330867]",
       href: "/travel-plans",
    },
  ];
  return (
    <>
    <Header />
    <HomeBanner />
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[4vw]  lg:text-[2vw] font-bold text-gray-900 dark:text-gray-200">
            Manage Your Mobile Needs with Ease
          </h2>
          <p className="text-gray-500 mt-2 text-[3vw] lg:text-[1.2vw] dark:text-gray-400">
            Everything you need in one powerful platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12">

          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-sm hover:shadow-md transition px-4 py-4 lg:px-12 lg:py-12">  
            {/* IMAGE LEFT */}
            <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
              <img src="/img/payRecharge.png" alt="Recharge & Bill Pay" />
            </div>

            {/* TEXT LEFT */}
            <h3 className="font-semibold text-[4vw] lg:text-[1vw] md:text-[2vw] text-gray-900 dark:text-gray-200">
              Recharge &amp; Bill Pay
            </h3>

            <p className="text-gray-500 mt-2 text-[3vw] lg:text-[1vw] md:text-[1vw] dark:text-gray-400">
              Quick and secure payments with instant confirmation
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-6 shadow-sm hover:shadow-md transition px-4 py-4 lg:px-12 lg:py-12">
  
            {/* IMAGE LEFT */}
            <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
              <img src="/img/switch.png" alt="Recharge & Bill Pay" />
            </div>

            {/* TEXT LEFT */}
            <h3 className="font-semibold text-[4vw] lg:text-[1vw] md:text-[2vw] text-gray-900 dark:text-gray-200">
              Switch To GoLite
            </h3>

            <p className="text-gray-500 mt-2 text-sm text-[3vw] lg:text-[1vw] md:text-[1vw] dark:text-gray-400">
              Make the smart move today and switch from any network to GoLite
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-6 shadow-sm hover:shadow-md transition px-4 py-4 lg:px-12 lg:py-12">
  
            {/* IMAGE LEFT */}
            <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
              <img src="/img/sim.png" alt="Recharge & Bill Pay" />
            </div>

            {/* TEXT LEFT */}
            <h3 className="font-semibold text-[4vw] lg:text-[1vw] md:text-[2vw] text-gray-900 dark:text-gray-200">
              SIM Activation
            </h3>

            <p className="text-gray-500 mt-2 text-sm text-[3vw] lg:text-[1vw] md:text-[1vw] dark:text-gray-400">
              Activate GoLite SIM instantly and step into seamless connectivity
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-gray-800 border rounded-2xl p-6 shadow-sm hover:shadow-md transition px-4 py-4 lg:px-12 lg:py-12">
  
            {/* IMAGE LEFT */}
            <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
              <img src="/img/mobile.png" alt="Recharge & Bill Pay" />
            </div>

            {/* TEXT LEFT */}
            <h3 className="font-semibold text-[4vw] lg:text-[1vw] md:text-[2vw] text-gray-900 dark:text-gray-200">
              Shop Mobile
            </h3>

            <p className="text-gray-500 mt-2 text-sm text-[3vw] lg:text-[1vw] md:text-[1vw] dark:text-gray-400">
              Find your perfect mobile device and enhance connectivity with GoLite.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full dark:bg-[#01241b] bg-[#11A683] text-white  relative overflow-hidden">

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">

        {/* Title */}
        <h2 className="lg:text-3xl md:text-[3vw] text-[4vw] font-bold pt-[4vw] px-[3vw] dark:text-gray-400">
          Stay Connected Anywhere with Affordable Prepaid Travel Plans!
        </h2>

        {/* Feature List */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-white text-sm md:text-lg px-4 md:px-64">

          <p className="flex items-center gap-2 whitespace-nowrap dark:text-gray-400">
            <span className="dark:bg-gray-700 w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600 text-sm font-bold">✓</span>
            Free Talk &amp; Text
          </p>

          <p className="flex items-center gap-2 whitespace-nowrap dark:text-gray-400">
            <span className="dark:bg-gray-700 w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600 text-sm font-bold">✓</span>
            Mobile Hotspot Access
          </p>

          <p className="flex items-center gap-2 whitespace-nowrap dark:text-gray-400">
            <span className="dark:bg-gray-700 w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600 text-sm font-bold">✓</span>
            Unlimited 5G Data
          </p>

          <p className="flex items-center gap-2 whitespace-nowrap dark:text-gray-400">
            <span className="dark:bg-gray-700 w-5 h-5 flex items-center justify-center rounded-full bg-white text-green-600 text-sm font-bold">✓</span>
            24 x 7 Customer Support
          </p>

          <p className="flex items-center gap-2 whitespace-nowrap dark:text-gray-400">
            <span className=" w-5 h-5 flex items-center justify-center rounded-full dark:bg-gray-700 bg-white text-green-600 text-sm font-bold">✓</span>
            FREE Roaming Canada &amp; Mexico
          </p>
        </div>

        {/* Button */}
        <button onClick={allplans} className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded cursor-pointer">
          View Plans
        </button>
      </div>

      <div className="w-full">
        <img
          src="/img/travelplansection.png"
          alt="World Landmarks"
          className="w-full object-cover pointer-events-none select-none dark:opacity-20"
        />
      </div>
    </section>

    <PlanSlider/>

    <section className="w-full py-14 bg-white dark:bg-gray-900">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
          Premium Mobile Brands at <br /> Affordable Prices
        </h2>
        <p className="text-gray-500 mt-2">
          Get the latest smartphones with exclusive GoLite discounts
        </p>
      </div>

      {/* Image Box */}
      <div className="w-full flex justify-center">
        <div className=" bg-[#F8F9FA] dark:bg-gray-800 shadow-[0_0_0_0_#000000,5px_5px_20px_5px_var(--tw-shadow-color,#0000001a)] rounded-3xl p-6 max-w-5xl w-full">
          <div className="rounded-xl flex justify-center items-center p-4">
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
        <button className="bg-[#034EA2] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">SAMSUNG</button>
        <button className="bg-[#F50514] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">OnePlus</button>
        <button className="bg-[#3478A8] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">Apple</button>
        <button className="bg-[#34A853] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">realme</button>
        <button className="bg-[#034EA2] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">Google</button>
        <button className="bg-[#FD4C0E] text-white px-6 py-3 rounded-[.5vw] font-semibold p-[1.5vw]">OPPO</button>
      </div>

      {/* Browse Button */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#FF5722] text-white px-8 py-3 rounded-lg font-semibold shadow">
          Browse All Devices
        </button>
      </div>
    </section>

    <section className="w-full py-16 bg-white dark:bg-gray-800">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
          Plans for Your Lifestyle
        </h2>
        <p className="text-gray-500 mt-2">
          Tailored solutions for every need
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-70">
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
              href={c.href}
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
    <section className="w-full bg-[#FD4C0E] dark:bg-[#3d1001] py-16 text-center text-white">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Go Green with GoLite?
        </h2>

        {/* Subtext */}
        <p className="text-white/90 mt-3 text-lg  mx-auto">
          Join thousands of satisfied customers enjoying fast, affordable, 
          and sustainable mobile service.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">

          {/* Filled Button */}
          <button onClick={allplans} className="bg-white dark:border-white dark:bg-gray-900 text-[#FD4C0E] font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition cursor-pointer">
            View Plans
          </button>

          {/* Outline Button */}
          <button className="border dark:border-white border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-[#FD4C0E] transition cursor-pointer">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
