"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        { category: "prepaid", simType: "eSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
        { category: "prepaid", simType: "eSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","12-24 Month Contract","Unlimited International calls"] },
        { category: "prepaid", simType: "eSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming CA+MX","24-Month Contract"] },
        { category: "prepaid", simType: "eSim", title: "Go-Unlimited1 postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming","24-Month Contract"] },
    
        // POSTPAID - pSIM
        { category: "prepaid", simType: "pSim", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$20.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Physical SIM included","12-Month Contract"] },
        { category: "prepaid", simType: "pSim", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$39.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Physical SIM included","12-24 Month Contract"] },
        { category: "prepaid", simType: "pSim", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM included","24-Month Contract"] },
    
      ];
    const specialPlans = [
  { title: "Frequent Travelers", bg: "bg-orange-50", img: "/img/specialTraveler.png", link:"/travel-plans" },
  { title: "Students", bg: "bg-pink-50", img: "/img/specialStudent.png", offer: true, link: "/students-discount-application" },
  { title: "Streaming Enthusiasts", bg: "bg-purple-50", img: "/img/specialStreaming-enthusiasts.png", link: "/streaming-enthusiasts-plans" },
  { title: "First Responders", bg: "bg-teal-50", img: "/img/specialRirst-responder-img.png", offer: true, link: "/first-responder-discount-application" },
  { title: "Age 55+", bg: "bg-blue-50", img: "/img/specialAge-55.png", offer: true, link: "/senior-citizen-discount-enrollment-form" },
  { title: "Military & Veterans", bg: "bg-green-50", img: "/img/specialMilitary.png", offer: true, link: "/military-discount-eligibility-form" },
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
  return (
    <>
    <Header />
    {/* Banner Section */}
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Shop Prepaid Travel Plans
        </h1>
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
 </div>
    </div>

        {/* Header */}
       

      <section className="max-w-7xl mx-auto px-6 py-20">
      
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-12">
              Plans for your Lifestyle
            </h2>
      
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {specialPlans.map((item, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl border border-gray-200 p-6 text-center ${item.bg}`}
                >
                  {item.offer && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                      SPECIAL OFFER
                    </span>
                  )}
      
                  <div className="relative aspect-[7/5] w-full">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
      
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center justify-center gap-1 pt-8">
                    <a
                    href={item.link}
                    className="flex items-center gap-1 hover:underline"
                  >
                    {item.title}
                    <span>↗</span>
                    </a>
                  </h3>
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