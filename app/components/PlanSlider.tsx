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
    { type: "prepaid", title: "Go-Lite prepaid", price: "$18.00/mo", features: ["3 GB High-speed Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { type: "prepaid", title: "Go-Steady prepaid", price: "$37.00/mo", features: ["9 GB High-speed Data","Unlimited talk & text","900 MB Hotspot","12 or 24 Month Contract","Unlimited free International calls"] },
    { type: "prepaid", title: "Go-Unlimited prepaid", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited high-speed data","Unlimited talk & text","4.5 GB Hotspot","Free roaming in Canada & Mexico","24-Month Contract","Unlimited international calls"] },
    { type: "prepaid", title: "Go-Unlimited1 prepaid", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Free roaming","24-Month Contract"] },

    // POSTPAID
    { type: "postpaid", title: "Go-Lite postpaid", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","12-Month Contract","Free calls to 200+ countries"] },
    { type: "postpaid", title: "Go-Steady postpaid", price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","12-24 Month Contract","Unlimited International calls"] },
    { type: "postpaid", title: "Go-Unlimited postpaid", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming CA+MX","24-Month Contract"] },
    { type: "postpaid", title: "Go-Unlimited1 postpaid", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming","24-Month Contract"] },

    // TRAVEL
    { type: "travel", title: "Go-Lite travel", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","International calls"] },
    { type: "travel", title: "Go-Steady travel", price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","International calls"] },
    { type: "travel", title: "Go-Unlimited travel", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Roaming"] },
    { type: "travel", title: "Go-Unlimited1 travel", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","International calls"] },

    // BUSINESS
    { type: "business", title: "Go-Lite business", price: "$18.00/mo", features: ["3 GB Data","Unlimited talk & text","500 MB Hotspot","Business Support"] },
    { type: "business", title: "Go-Steady business", price: "$37.00/mo", features: ["9 GB Data","Unlimited talk & text","900 MB Hotspot","Business Priority"] },
    { type: "business", title: "Go-Unlimited business", price: "$58.00/mo", tag: "Most Popular", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Roaming"] },
    { type: "business", title: "Go-Unlimited1 business", price: "$54.00/mo", features: ["Unlimited data","Unlimited talk & text","4.5 GB Hotspot","Business Support"] },
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
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-orange-100 rounded-full p-1">
          {["prepaid", "postpaid", "travel", "business"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full capitalize ${
                activeTab === tab ? "bg-orange-500 text-white" : ""
              }`}
            >
              {tab} Plans
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 md:px-40 mt-10">
        <Slider {...sliderSettings}>
          {filteredPlans.map((plan, idx) => (
            <div key={idx}>
              <div className={`border p-6 rounded-2xl shadow-sm relative ${plan.tag ? "bg-blue-50" : ""}`}>
                {plan.tag && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    {plan.tag}
                  </span>
                )}

                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold mb-1">{plan.price}</p>
                <p className="text-gray-500 mb-4">(taxes and fees included)</p>

                <button className="w-full border border-orange-500 text-orange-500 font-semibold py-2 rounded-full">
                  Buy Plan
                </button>

                <ul className="mt-5 space-y-2 text-gray-700">
                  {plan.features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
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