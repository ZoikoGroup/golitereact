"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StreamingSlider from "../components/StreamingSlider";
export default function StreamingPlans() {
  return (
    <>
    <Header />
    <div className="w-full bg-[#FFF7F7]">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#FF6A3D] rounded-2xl overflow-hidden">
          {/* Left */}
          <div className="p-8 md:p-12 text-white max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Stream Without Limits:
              <br />
              Tailored Plans for
              <br />
              Streaming Enthusiasts!
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-90">
              Enjoy uninterrupted, high-speed streaming with our premium mobile plans
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-1/2 h-full flex justify-end">
            <img
              src="/img/specialStreaming-enthusiasts.png"
              alt="Streaming Gamer"
              className="object-cover max-h-[260px] md:max-h-[320px]"
            />
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Shop Streaming Enthusiasts Plans
        </h2>
      </section>

      {/* Tabs */}
      <StreamingSlider />

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 mt-20 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "What is GoLite Mobile?",
            "Does GoLite Mobile support 5G?",
            "What network does GoLite Mobile use?",
            "Do your plans include mobile hotspot data?",
            "What is Data Rollover, and how does it work?",
            "Are there restrictions on unlimited data plans?",
            "How does billing work for GoLite mobile plans?",
            "Are there any hidden fees or activation charges?",
            "Can I switch between plans?",
            "Can I bring my own phone to GoLite Mobile?",
            "How do I activate my GoLite Mobile SIM card?",
            "Does GoLite Mobile offer international roaming?",
          ].map((q, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white rounded-xl px-6 py-4 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-700">{q}</p>
              <span className="text-[#FF6A3D] text-xl font-bold">+</span>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
