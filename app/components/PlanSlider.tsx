"use client";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function PricingPlans() {
  const [activeCategory, setActiveCategory] = useState("prepaid");
  const [activeSimType, setActiveSimType] = useState("eSim");
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<any>(null);
  const router = useRouter();

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

    // TRAVEL - eSIM
    { category: "travel", simType: "eSim", title: "Go-Lite travel", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.",  price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","International calls"] },
    { category: "travel", simType: "eSim", title: "Go-Steady travel", desc:"Everyday users, families, and those who need constant connectivity.", price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","International calls"] },
    { category: "travel", simType: "eSim", title: "Go-Unlimited travel", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming"] },
    { category: "travel", simType: "eSim", title: "Go-Unlimited1 travel", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","International calls"] },

    // TRAVEL - pSIM
    { category: "travel", simType: "pSim", title: "Go-Lite travel", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.",  price: "$20.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Physical SIM","International calls"] },
    { category: "travel", simType: "pSim", title: "Go-Steady travel", desc:"Everyday users, families, and those who need constant connectivity.", price: "$39.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Physical SIM","International calls"] },
    { category: "travel", simType: "pSim", title: "Go-Unlimited travel", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$60.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Physical SIM","Roaming"] },

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
    <div className="w-full bg-white py-10">
      <style>{customStyles}</style>
      <h2 className="text-3xl font-bold text-center mb-8">Shop Sustainable Plans</h2>

      {/* Category Tabs - RESPONSIVE FIX */}
      <div className="flex justify-center mb-4 px-4">
        <div className="inline-flex bg-[#FD4C0E] rounded-full p-1 w-full max-w-4xl">
          {["prepaid", "postpaid", "travel", "business"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-full cursor-pointer capitalize transition-all whitespace-nowrap ${
                activeCategory === tab ? "bg-[#FFFFFF] text-[#FD4C0E]" : "text-[#FFFFFF]"
              }`}
            >
              <span className="hidden sm:inline">{tab} Plans</span>
              <span className="sm:hidden">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SIM Type Tabs */}
      <div className="flex justify-center">
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
  <button
    onClick={() => router.push(`${activeCategory}`)}
    className="bg-[#FD4C0E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E63D00] w-full sm:w-auto sm:min-w-[200px] transition-all"
  >
    View All
  </button>
</div>
      </div>
    </div>
  );
}