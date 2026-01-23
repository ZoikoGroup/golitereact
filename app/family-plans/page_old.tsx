"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
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

export default function PostpaidPlansHero() {
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
        // POSTPAID - eSIM
        { category: "postpaid", simType: "eSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
        { category: "postpaid", simType: "eSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","12-24 Month Contract","Unlimited International calls"] },
        { category: "postpaid", simType: "eSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming CA+MX","24-Month Contract"] },
        { category: "postpaid", simType: "eSim", title: "Go-Unlimited1 postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming","24-Month Contract"] },
    
        // POSTPAID - pSIM
        { category: "postpaid", simType: "pSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$20.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Physical SIM included","12-Month Contract"] },
        { category: "postpaid", simType: "pSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$39.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Physical SIM included","12-24 Month Contract"] },
        { category: "postpaid", simType: "pSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM included","24-Month Contract"] },
    
      ];
    
      const filteredPlans = plans.filter((p) =>  p.simType === activeSimType);
    
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
    const benefits = [
        {
        icon: <Image src="/img/network.png" alt="FREE 5G Network" width={32} height={32} className="w-[5rem] h-[5rem]" />,
        title: "Nationwide FREE 5G Network",
        description: "Experience ultra-fast speeds with our expansive 5G coverage at no extra cost!",
        bgColor: "bg-orange-50"
        },
        {
        icon: <Image src="/img/hotspot.png" alt="20GB Mobile Hotspot" width={32} height={32} className="w-[5rem] h-[5rem]" />,
        title: "Up to 20GB Mobile Hotspot",
        description: "Stay connected. Use your phone to let your other devices surf the web for work on the go.",
        bgColor: "bg-orange-50"
        },
        {
        icon: <Image src="/img/phone.png" alt="International Calls" width={32} height={32} className="w-[5rem] h-[5rem]" />,
        title: "Free International Calls",
        description: "Call your loved ones without border worries. Enjoy international calls at no extra charges.",
        bgColor: "bg-orange-50"
        },
        {
        icon: <Image src="/img/roam.png" alt="Free Roaming"  width={32} height={32} className="w-[5rem] h-[5rem]" />,
        title: "Canada & Mexico-Free Roaming",
        description: "Travel freely across North America with unlimited calling & texting. No extra roaming fees.",
        bgColor: "bg-blue-50"
        }
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
  
const faqs = [
  {
    question: "What is international long distance calling?",
    answer: "International long distance calling allows you to make phone calls from the United States to people in other countries."
  },
  {
    question: "Are international calls included in Zoiko Mobile plans?",
    answer: "Yes, all Zoiko Mobile plans include free international calling minutes to over 246 countries. The allowance varies depending on the destination country and whether you are calling a landline or mobile number."
  },
  {
    question: "What happens if I exceed my data limit?",
    answer: "Zoiko Mobile offers free international calling minutes to over 246 countries as part of every plan, with no additional activation or hidden fees. Most other carriers charge extra for similar services or cover fewer countries, making Zoiko Mobile a more affordable and comprehensive choice."
  },
  {
    question: "Do I need to activate international calling on my Zoiko Mobile plan?",
    answer: "No activation is required. International calling is automatically included in all Zoiko Mobile plans."
  },
  {
    question: "Can I use Zoiko Mobile's international calling feature on any device?",
    answer: "Yes, you can use Zoiko Mobile's international calling feature on any device compatible with our network, including smartphones and tablets."
  },
  {
    question: "How do I make an international call with Zoiko Mobile?",
    answer: (
      <ol className="list-decimal pl-5 break-words">
        <li>Dial "+" or "011" (the international dialing code).</li>
        <li>Enter the country code of the destination you are calling.</li>
        <li>Dial the phone number, including the area code if required.</li>
        <li>Press the call button to connect.</li>
      </ol>
    )
  }
];
  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);

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



  return (
    <>
    <Header />
    {/* Banner Section */}
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Shop Prepaid Family & Multi-Line Plans
        </h1>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="bg-orange-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[2.1rem] font-bold text-white mb-6 leading-tight">
                Stay Connected & Save with GoLite Mobile Family Plans
              </h2>
              <p className="text-white text-lg md:text-[1.1rem] leading-relaxed">
                Save big when you add more lines! Family plans start from just $7.99/line per month. Connect up to 10 lines with unlimited talk, text, and premium 5G data. Each member gets their own phone number and account access while you control the billing. Plus, enjoy exclusive family perks like shared data pools, parental controls, and priority support.
              </p>
            </div>

            {/* Right Image Section */}
            <div className="relative h-64 md:h-auto">
              <img
                src="./img/family-banner.jpg"
                alt="Three friends looking at a smartphone together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* END Banner Section */}
    
<div className="w-full bg-gray-50 py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Create Your Family Plan (Prepaid Plans)
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            Build a custom plan for your family. Select number of lines and choose your base plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Section - Plan Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Select Your Primary Plan
              </h3>
              <p className="text-gray-600 mb-6 text-sm lg:text-base">
                Choose the plan for all lines (only $18 &amp; match after checkout)
              </p>

              {/* Plan Cards Grid - First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8">
                {Familyplans.map((plan) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    isSelected={selectedPlan === plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                  />
                ))}
              </div>

              

              {/* Additional Lines Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4 mt-4">
                <label className="text-gray-800 font-semibold text-sm lg:text-base whitespace-nowrap">
                  Choose the number of additional Lines
                </label>
                <select
                  value={additionalLines}
                  onChange={(e) => setAdditionalLines(Number(e.target.value))}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base"
                >
                  <option value={0}>Select Number of Lines</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Additional Line{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Section - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Your Family Plan Summary
              </h3>

              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 text-sm lg:text-base">Selected Plan:</span>
                  <span className="font-semibold text-gray-900 text-sm lg:text-base">{selectedPlan}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm lg:text-base">Number of Lines:</span>
                  <span className="font-semibold text-gray-900 text-sm lg:text-base">{1 + additionalLines}</span>
                </div>
              </div>

              <div className="mb-4 lg:mb-6">
                <p className="text-gray-600 text-sm mb-2">Total Monthly Cost:</p>
                <p className="text-4xl lg:text-5xl font-bold text-orange-500">${calculateTotal()}</p>
                <p className="text-gray-500 text-sm mt-1">Taxes &amp; fees included</p>
              </div>

              <button className="w-full bg-[#FD4C0E] hover:bg-[#E63D00] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


{/* SIM Type Tabs */}
      <div className="flex justify-center">
  <div className="inline-flex bg-[#FD4C0E] rounded-full mt-6 p-1 w-[35rem] h-[4rem]">
    
    {["pSim", "eSim"].map((simType, idx) => (
      <button
        key={simType}
        onClick={() => setActiveSimType(simType)}
        className={`
          flex-1 m-[.2rem]
          flex items-center justify-center
          text-sm font-semibold transition-all
          rounded-full
          ${activeSimType === simType 
            ? "bg-white text-[#FD4C0E]" 
            : "text-white"}
        `}
      >
        {simType === "pSim" ? "Phecial Sim" : "eSim"}
      </button>
    ))}

  </div>
</div>

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
            <div key={idx} className="px-8">
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
        </div>

        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 text-center mb-12 px-4">
          Best Postpaid Mobile Plans With Many Exciting Benefits
        </h1>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className={`w-[5rem] h-[5rem]   flex items-center justify-center mb-6`}>
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>


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
 <div className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
                    <span>{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 py-3 text-gray-700 break-words">
                    {item.answer}
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-4">
          {rightColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
                    <span>{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 py-3 text-gray-700 break-words">
                    {item.answer}
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}