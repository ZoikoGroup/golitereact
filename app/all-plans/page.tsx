"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomFamilyPlansComponent from "../components/CustomFamilyPlans";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Check } from 'lucide-react';
import { FaSimCard, FaPhoneAlt, FaPlane, FaBriefcase } from "react-icons/fa";

/* Custom Dots Style */
const customStyles = `
  .slick-dots li button:before {
  font-size: 10px;
  color: #d1d1d1;
  opacity: 1;
  }
  .slick-dots li.slick-active button:before {
  color: #ff6600 !important;
  width: 30px !important;
  height: 8px !important;
      
  }
  .slick-dots li.slick-active .dots {
  background: #fd4c0e;
  width: 1.3vw;
  }
`;

export default function AllPlans() {

  const [selectedPlan, setSelectedPlan] = useState('Go-Connect');
  const [additionalLines, setAdditionalLines] = useState(0);

  const Familyplans = [
    { name: 'Go-Connect', duration: '30 Days', simType: 'eSIM', price: 18.00 },
    { name: 'Go-Smart', duration: '30 Days', simType: 'eSIM', price: 19.00 },
    { name: 'Go-Flex', duration: '30 Days', simType: 'eSIM', price: 20.00 },
    { name: 'Go-Connect 1', duration: '30 Days', simType: 'eSIM', price: 21.00 },
    { name: 'Go-Smart 1', duration: '30 Days', simType: 'eSIM', price: 22.00 },
    { name: 'Go-Flex 1', duration: '30 Days', simType: 'eSIM', price: 29.00 },
    { name: 'Go-Connect 2', duration: '30 Days', simType: 'eSIM', price: 28.00 },
    { name: 'Go-Smart 2', duration: '30 Days', simType: 'eSIM', price: 27.00 },
    { name: 'Go-Flex 2', duration: '30 Days', simType: 'eSIM', price: 23.00 },
    { name: 'Go-Connect 3', duration: '30 Days', simType: 'eSIM', price: 24.00 },
    { name: 'Go-Smart 3', duration: '30 Days', simType: 'eSIM', price: 25.00 },
    { name: 'Go-Flex 3', duration: '30 Days', simType: 'eSIM', price: 26.00 },
  ];

  const calculateTotal = () => {
    const basePlan = Familyplans.find(p => p.name === selectedPlan);
    return ((basePlan?.price || 0) * (1 + additionalLines)).toFixed(2);
  };

  const PlanCard = ({ plan, isSelected, onClick }: any) => (
    <div
      onClick={onClick}
      className={`relative p-4 lg:p-6 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      <h3 className={`text-lg lg:text-xl font-bold mb-3 lg:mb-4 ${isSelected ? 'text-orange-500' : 'text-gray-800'}`}>
        {plan.name}
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Call Duration:</span>
          <span className="font-semibold text-gray-800">{plan.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">SIM Type:</span>
          <span className="font-semibold text-gray-800">{plan.simType}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-600">Price:</span>
          <span className="font-bold text-gray-800">${plan.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
  const [activeCategory, setActiveCategory] = useState("prepaid");
  const [activeSimType, setActiveSimType] = useState("eSim");
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setSlidesToShow(1);
      } else if (width <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const plans = [
    // PREPAID - eSIM
    { category: "prepaid", simType: "eSim", title: "Go-Lite prepaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB High-speed Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { category: "prepaid", simType: "eSim", title: "Go-Steady prepaid", desc:"Everyday users, families, and those who need constant connectivity.", price: "$37.00/mo", features: ["9 GB High-speed Data","Unlimited talk & text","900 MB Hotspot","12 or 24 Month Contract","Unlimited free International calls"] },
    { category: "prepaid", simType: "eSim", title: "Go-Unlimited prepaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited high-speed data","Unlimited talk & text","4.5 GB Hotspot","Free roaming in Canada & Mexico","24-Month Contract","Unlimited international calls"] },
    { category: "prepaid", simType: "eSim", title: "Go-Unlimited1 prepaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data11", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Free roaming","24-Month Contract"] },

    // PREPAID - pSIM
    { category: "prepaid", simType: "pSim", title: "Go-Lite prepaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$20.00/mo", features: ["3 GB High-speed Data","Unlimited talk & text","500 MB Hotspot","Physical SIM card included","12-Month Contract"] },
    { category: "prepaid", simType: "pSim", title: "Go-Steady prepaid", desc:"Everyday users, families, and those who need constant connectivity.", price: "$39.00/mo", features: ["9 GB High-speed Data","Unlimited talk & text","900 MB Hotspot","Physical SIM card included","12 or 24 Month Contract"] },
    { category: "prepaid", simType: "pSim", title: "Go-Unlimited prepaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited high-speed data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM card included","24-Month Contract"] },

    // POSTPAID - eSIM
    { category: "postpaid", simType: "eSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { category: "postpaid", simType: "eSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","12-24 Month Contract","Unlimited International calls"] },
    { category: "postpaid", simType: "eSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming CA+MX","24-Month Contract"] },
    { category: "postpaid", simType: "eSim", title: "Go-Unlimited1 postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming","24-Month Contract"] },

    // POSTPAID - pSIM
    { category: "postpaid", simType: "pSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$20.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Physical SIM included","12-Month Contract"] },
    { category: "postpaid", simType: "pSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$39.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Physical SIM included","12-24 Month Contract"] },
    { category: "postpaid", simType: "pSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM included","24-Month Contract"] },

    // BUSINESS - eSIM
    { category: "business", simType: "eSim", title: "Go-Lite business", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Business Support"] },
    { category: "business", simType: "eSim", title: "Go-Steady business",  desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Business Priority"] },
    { category: "business", simType: "eSim", title: "Go-Unlimited business", desc:"Heavy users, streamers, and those who demand consistent high-speed data",  price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Roaming"] },
    { category: "business", simType: "eSim", title: "Go-Unlimited1 business", desc:"Heavy users, streamers, and those who demand consistent high-speed data1",  price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Support"] },

    // BUSINESS - pSIM
    { category: "business", simType: "pSim", title: "Go-Lite business", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$20.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Physical SIM","Business Support"] },
    { category: "business", simType: "pSim", title: "Go-Steady business",  desc:"Everyday users, families, and those who need constant connectivity.",  price: "$39.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Physical SIM","Business Priority"] },
    { category: "business", simType: "pSim", title: "Go-Unlimited business", desc:"Heavy users, streamers, and those who demand consistent high-speed data",  price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM","Business Roaming"] },
  ];

const tabs = [
  { key: "prepaid", label: "Prepaid Plans", icon: FaSimCard },
  { key: "postpaid", label: "Postpaid Plans", icon: FaPhoneAlt },
  // { key: "travel", label: "Travel Plans", icon: FaPlane },
  { key: "business", label: "Business Plans", icon: FaBriefcase },
];

const cards = [
    {
      title: "Student Connect+",
      desc: "Special discounts for students with edu email verification",
      badge: "NEW",
      gradient: "from-[#667EEA] to-[#764BA2]",
      href: "#",
    },
    {
      title: "Senior Saver",
      desc: "Simplified plans with dedicated support for seniors 60+",
      gradient: "from-[#F093FB] to-[#F5576C]",
    },
    {
      title: "Work-Life Unlimited",
      desc: "Business features with personal benefits in one plan",
      gradient: "from-[#4FACFE] to-[#00F2FE]",
       href: "#",
    },
    {
      title: "Family Bundle",
      desc: "Connect up to 5 lines with shared data and savings",
      gradient: "from-[#43E97B] to-[#38F9D7]",
       href: "#",
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
       href: "#",
    },
  ];
  const filteredPlans = plans.filter((p) => p.category === activeCategory && p.simType === activeSimType);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    customPaging: () => (
      <div className="h-2 w-2 bg-gray-300 rounded-full mx-1 mt-2 dots"></div>
    ),
    dotsClass: "slick-dots flex justify-center",
  };

  return (
    <>
    <Header />
    <div className="h-[20rem] flex items-center justify-center p-8" style={{
      background: 'linear-gradient(to right, #43CAC4, #34136D)'
    }}>
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Find Your Perfect Plan
        </h1>
        <p className="text-lg md:text-xl text-white/90 lg:px-30">
          Flexible mobile plans and device protection for every need - from personal to business
        </p>
      </div>
    </div>

     <div className="w-full bg-white py-10">
      <style>{customStyles}</style>
      <h2 className="text-3xl font-bold text-center mb-8">Shop Sustainable Plans</h2>

      {/* Category Tabs - RESPONSIVE FIX */}
      <div className="border-b border-gray-200">
  <div className="flex justify-between max-w-5xl mx-auto px-4">
    {tabs.map(({ key, label, icon: Icon }) => (
      <button
        key={key}
        onClick={() => setActiveCategory(key)}
        className={`flex flex-col items-center justify-center flex-1 py-3 text-xs sm:text-sm font-medium transition relative
          ${
            activeCategory === key
              ? "text-[#FD4C0E]"
              : "text-gray-500 hover:text-[#FD4C0E]"
          }`}
      >
        <Icon className="text-base sm:text-lg mb-1" />

        <span className="whitespace-nowrap">{label}</span>

        {/* Active underline */}
        {activeCategory === key && (
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FD4C0E] rounded-t-full" />
        )}
      </button>
    ))}
  </div>
</div>

      {/* SIM Type Tabs */}
      {/* <div className="flex justify-center">
        <div className="inline-flex p-1">
          {["pSim", "eSim"].map((simType) => (
            <button
              key={simType}
              onClick={() => setActiveSimType(simType)}
              className={`px-8 py-2 text-sm font-semibold cursor-pointer transition-all ${
                activeSimType === simType ? "text-[#FD4C0E] underline" : "text-gray-600"
              }`}
            >
              {simType}
            </button>
          ))}
        </div>
      </div> */}

      {/* Slider with Navigation */}
      <div className="px-4 md:px-40 mt-10 relative">
        {/* Custom Arrow Buttons */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#FD4C0E]" />
        </button>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#FD4C0E]" />
        </button>

        <Slider key={slidesToShow} ref={sliderRef} {...sliderSettings} className="my-4">
          {filteredPlans.map((plan, idx) => (
            <div key={idx} className="px-12">
              <div
                className={`relative border p-6 rounded-2xl shadow-sm min-h-[40vw] overflow-hidden ${
                  plan.tag ? "bg-blue-50" : "bg-white"
                }`}
              >
                {/* Diagonal Ribbon Tag */}
                {plan.tag && (
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                    <span className="absolute top-7 -right-8 rotate-45 bg-green-600 text-white text-xs font-semibold px-8 py-1 shadow-md tracking-wide">
                      {plan.tag}
                    </span>
                  </div>
                )}

                {/* Plan Title */}
                <h3 className="text-xl lg:text-[1.2vw] font-semibold mb-2 text-center mt-8">{plan.title}</h3>

                {/* Price */}
                <p className="text-3xl font-bold mb-1 text-center">{plan.price}</p>
                <p className="text-gray-500 mb-4 text-center text-sm">(taxes and fees included)</p>

                {/* Button */}
                <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                  Buy Plan
                </button>

                {/* Description */}
                <p className="text-gray-500 mb-4 text-left pt-6 text-sm">{plan.desc}</p>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-gray-700 text-sm lg:h-[20vw] md:h-[20vw]">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="m4.5 12.75 6 6 9-13.5" 
                        />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Slider>

        <div className="flex justify-center mt-6">
          <button className="bg-[#FD4C0E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E63D00] w-full sm:w-auto sm:min-w-[200px] transition-all">
            View All
          </button>
        </div>
      </div>
    </div>

<CustomFamilyPlansComponent />

<section className="w-full py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900">
          Plans for Your Lifestyle
        </h2>
        <p className="text-gray-500 mt-2">
          Tailored solutions for every need
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-50">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`rounded-2xl p-12 text-white shadow-lg bg-gradient-to-br ${c.gradient}`}
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
              href="{c.href}"
              className="mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline"
            >
              View Plans →
            </a>
          </div>
        ))}
      </div>
    </section>

    <Footer />
    </>
  );
}