"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
`;
export default function PricingPlans() {
  const [activeTab, setActiveTab] = useState("prepaid");

  const plans = [
    // PREPAID
    { type: "prepaid", title: "Go-Lite prepaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB High-speed Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { type: "prepaid", title: "Go-Steady prepaid", desc:"Everyday users, families, and those who need constant connectivity.", price: "$37.00/mo", features: ["9 GB High-speed Data","Unlimited talk & text","900 MB Hotspot","12 or 24 Month Contract","Unlimited free International calls"] },
    { type: "prepaid", title: "Go-Unlimited prepaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited high-speed data","Unlimited talk & text","4.5 GB Hotspot","Free roaming in Canada & Mexico","24-Month Contract","Unlimited international calls"] },
    { type: "prepaid", title: "Go-Unlimited1 prepaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data11", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Free roaming","24-Month Contract"] },

    // POSTPAID
    { type: "postpaid", title: "Go-Lite postpaid", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { type: "postpaid", title: "Go-Steady postpaid", desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","12-24 Month Contract","Unlimited International calls"] },
    { type: "postpaid", title: "Go-Unlimited postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming CA+MX","24-Month Contract"] },
    { type: "postpaid", title: "Go-Unlimited1 postpaid", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming","24-Month Contract"] },

    // TRAVEL
    { type: "travel", title: "Go-Lite travel", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.",  price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","International calls"] },
    { type: "travel", title: "Go-Steady travel", desc:"Everyday users, families, and those who need constant connectivity.", price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","International calls"] },
    { type: "travel", title: "Go-Unlimited travel", desc:"Heavy users, streamers, and those who demand consistent high-speed data", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming"] },
    { type: "travel", title: "Go-Unlimited1 travel", desc:"Heavy users, streamers, and those who demand consistent high-speed data1", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","International calls"] },

    // BUSINESS
    { type: "business", title: "Go-Lite business", desc:"Budget-conscious users, occasional data users, and those who primarily use Wi-Fi.", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Business Support"] },
    { type: "business", title: "Go-Steady business",  desc:"Everyday users, families, and those who need constant connectivity.",  price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Business Priority"] },
    { type: "business", title: "Go-Unlimited business", desc:"Heavy users, streamers, and those who demand consistent high-speed data",  price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Roaming"] },
    { type: "business", title: "Go-Unlimited1 business", desc:"Heavy users, streamers, and those who demand consistent high-speed data1",  price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Support"] },
  ];

const filteredPlans = plans.filter((p) => p.type === activeTab);


const sliderSettings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 3,
slidesToScroll: 1,
arrows: true,
customPaging: () => (
<div className="h-2 w-2 bg-gray-300 rounded-full mx-1"></div>
),
dotsClass: "slick-dots !important flex justify-center mt-4",
};

  return (
    <div className="w-full bg-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Sustainable Plans</h2>

      {/* Tabs */}
      <div className="flex justify-center h-[4vw]">
        <div className="inline-flex bg-[#FD4C0E] rounded-full p-1 w-[75vw] justify-center">
          {["prepaid", "postpaid", "travel", "business"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold font-medium rounded-full w-[15vw]  cursor-pointer  capitalize ${
                activeTab === tab ? "bg-[#FFFFFF] text-[#FD4C0E]" : " text-[#FFFFFF]"
              }`}
            >
              {tab} Plans
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 md:px-40 mt-10">
        <Slider {...sliderSettings} className="my-4">
  {filteredPlans.map((plan, idx) => (
    <div key={idx} className="px-10">
      
      <div
        className={`relative border p-6 rounded-[2vw] shadow-sm h-[35vw] overflow-hidden  ${
          plan.tag ? "bg-blue-50" : ""
        }`}
      >

        {/* === Diagonal Ribbon Tag === */}
        {plan.tag && (
          <span
            className="absolute right-[-60px] rotate-45 
                       bg-green-600 text-white text-xs font-semibold 
                       px-15 py-1 shadow-md tracking-wide"
          >
            <label className="">{plan.tag}</label>
          </span>
        )}

        {/* PLAN TITLE */}
        <h3 className="text-xl font-semibold mb-2 text-center mt-8">{plan.title}</h3>

        {/* PRICE */}
        <p className="text-3xl font-bold mb-1 text-center">{plan.price}</p>
        <p className="text-gray-500 mb-4 text-center">(taxes and fees included)</p>

        {/* BUTTON */}
        <button className="w-full border border-orange-500 text-orange-500 font-semibold py-2 rounded-[.5vw]">
          Buy Plan
        </button>
        <p className="text-gray-500 mb-4 text-left pt-8">{plan.desc}</p>
        {/* FEATURES */}
        <ul className="mt-5 space-y-2 text-gray-700">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <label className=" text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="2" 
                        stroke="currentColor" 
                        className="w-5 h-5 text-green-600">
                    <path strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
</label> <span>{f}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  ))}
</Slider>
        <div className="flex justify-center mt-6">
<button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">View All</button>
</div>
      </div>
    </div>
  );
}