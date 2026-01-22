"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---------- Types ---------- */
type Plan = {
  id: number;
  name: string;
  short_description: string;
  final_price: number;
  is_popular: boolean;
  sim_type: "esim" | "psim";
  features: { title: string }[];
};

/* ---------- Custom dots ---------- */
const customStyles = `
.slick-dots li button:before {
  font-size: 10px;
  color: #d1d1d1;
  opacity: 1;
}
.slick-dots li.slick-active button:before {
  color: #ff6600 !important;
}
`;

export default function PrepaidPlansClient({ plans }: { plans: Plan[] }) {
  const [activeSimType, setActiveSimType] = useState<"eSim" | "pSim">("eSim");
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<any>(null);

  /* ---------- Responsive slider ---------- */
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 640) setSlidesToShow(1);
      else if (window.innerWidth <= 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------- Normalize API data ---------- */
//   const normalizedPlans = plans
//     .filter(p =>
//       activeSimType === "eSim" ? p.sim_type === "esim" : p.sim_type === "psim"
//     )
//     .map(p => ({
//       id: p.id,
//       title: p.name,
//       desc: p.short_description,
//       price: `$${p.final_price}/mo`,
//       tag: p.is_popular ? "Most Popular" : null,
//       features: p.features.map(f => f.title),
//     }));

    const normalizedPlans = plans.map(p => ({
  id: p.id,
  title: p.name,
  desc: p.short_description,
  price: `$${p.final_price}/mo`,
  tag: p.is_popular ? "Most Popular" : null,
  features: p.features?.map(f => f.title) || [],
}));


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
  };

  /* ---------- Static Sections ---------- */
  const benefits = [
    { icon: "/img/network.png", title: "Nationwide FREE 5G Network", desc: "Ultra-fast coverage at no extra cost." },
    { icon: "/img/hotspot.png", title: "Mobile Hotspot", desc: "Use your phone as Wi-Fi anywhere." },
    { icon: "/img/phone.png", title: "Free International Calls", desc: "Call 200+ countries free." },
    { icon: "/img/roam.png", title: "CA & MX Roaming", desc: "Roam freely in North America." },
  ];

  const faqs = [
    { q: "What is international calling?", a: "Call outside the US at no extra charge." },
    { q: "Is activation required?", a: "No. It’s included automatically." },
    { q: "What if I exceed data?", a: "Speed may reduce but service continues." },
    { q: "Is hotspot included?", a: "Yes, depending on your plan." },
  ];

  return (
    <>
      <Header />
      <style>{customStyles}</style>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Shop Prepaid Plans
        </h1>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="bg-orange-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-6 leading-tight">
                Smarter Prepaid Faster 5G Unmatched Value.
              </h2>
              <p className="text-white text-lg md:text-[1.2rem] leading-relaxed">
                Why sit in lines for prepaid, when mobile recharge is online and instant? Get ultimate freedom with GoLite's eco-friendly 5G prepaid plans, starting from just ₹7.99/mo with unlimited talk & text!
              </p>
            </div>

            {/* Right Image Section */}
            <div className="relative h-64 md:h-auto">
              <img
                src="./img/prepaidBanner.png"
                alt="Three friends looking at a smartphone together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* END Banner Section */}

      {/* ---------- PLANS SLIDER ---------- */}
      <div className="relative px-6 md:px-40 mt-10">
        <button onClick={() => sliderRef.current?.slickPrev()} className="absolute left-2 top-1/2 z-10">
          <ChevronLeft className="text-orange-500" />
        </button>

        <button onClick={() => sliderRef.current?.slickNext()} className="absolute right-2 top-1/2 z-10">
          <ChevronRight className="text-orange-500" />
        </button>

        <Slider ref={sliderRef} {...sliderSettings}>
          {normalizedPlans.map(p => (
            <div key={p.id} className="px-6">
              <div className="border rounded-2xl p-6 min-h-[420px] relative bg-white">
                {p.tag && (
                  <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded">
                    {p.tag}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-center">{p.title}</h3>
                <p className="text-3xl font-bold text-center">{p.price}</p>
                <button className="w-full mt-4 border-2 border-orange-500 text-orange-500 rounded-lg py-2 hover:bg-orange-500 hover:text-white">
                  Buy Plan
                </button>
                <p className="text-sm text-gray-500 mt-4">{p.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-600">✔</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ---------- BENEFITS ---------- */}
      <div className="bg-gray-50 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
              <Image src={b.icon} alt="" width={64} height={64} className="mx-auto" />
              <h3 className="font-bold mt-4">{b.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- FAQ ---------- */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        {faqs.map((f, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <div className="border rounded mb-3">
                <DisclosureButton className="w-full px-4 py-3 flex justify-between">
                  {f.q}
                  <span>{open ? "−" : "+"}</span>
                </DisclosureButton>
                <DisclosurePanel className="px-4 py-3 text-gray-600">
                  {f.a}
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      <Footer />
    </>
  );
}
