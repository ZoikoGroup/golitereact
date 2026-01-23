"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomFamilyPlansComponent from "../components/CustomFamilyPlans";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Check, CircleCheck, ArrowDownUp, TabletSmartphone, Receipt, Sigma, Headset, Clock, Layers, PlusCircle, FileText, User   } from "lucide-react";
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


type Plan = {
  name: "Go-Flex-Family" | "Go-Value-Family" | "Go-Prime-Family";
  duration: string;
  simType: "eSIM" | "pSIM";
  price: number;
};

/* DISCOUNT TABLE (PER-LINE TIER VALUE) */
const discountTable: Record<number, Record<Plan["name"], number>> = {
  1: { "Go-Flex-Family": 1, "Go-Value-Family": 3, "Go-Prime-Family": 5 },
  2: { "Go-Flex-Family": 2, "Go-Value-Family": 6, "Go-Prime-Family": 10 },
  3: { "Go-Flex-Family": 3, "Go-Value-Family": 9, "Go-Prime-Family": 15 },
  4: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  5: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  6: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  7: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  8: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  9: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
  10: { "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
};

export default function FamilyPlans() {
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
    
  
const features = [
  {
    title: "All Purpose Plans Available",
    desc: "Choose from a variety of plans - one size doesn't fit all. Mix and match plans for each family member based on their needs and usage patterns.",
    Icon: CircleCheck,
  },
  {
    title: "Shared Data",
    desc: "Pool your data allowance across all lines. When one person runs low, they can use data from another line. No more data waste!",
    Icon: ArrowDownUp,
  },
  {
    title: "Bring Your Own Device",
    desc: "Keep your existing phones! Our family plans work with any unlocked device. Just insert your SIM and you're ready to go.",
    Icon: TabletSmartphone,
  },
  {
    title: "More Economical Plan",
    desc: "Save up to 38% per line when you add more family members. The more lines you add, the more everyone saves each month.",
    Icon: Receipt,
  },
  {
    title: "Mix and Match Plans",
    desc: "Everyone in your family has different needs. Mix plans to get the perfect balance of data, features, and price for each member.",
    Icon: Sigma,
  },
  {
    title: "Easy International Calling",
    desc: "Stay connected with family abroad. All our plans include international calling to 50+ countries at no extra charge.",
    Icon: Headset,
  },
];

const getStarted = [
    {
      title: "Choose Your Plan",
      description: "Select the number of lines and base plan that fits your family's needs. You can mix and match later."
    },
    {
      
      title: "Add Family Members",
      description: "Invite family members via email or phone. Each person gets their own login and can manage their line."
    },
    {
      title: "Activate & Connect",
      description: "Receive your SIM cards, activate them online or via our app, and start saving immediately!"
    },
    {
      title: "Manage Your Account",
      description: "The primary account holder can view all lines, manage billing and adjust plans as needed from one dashboard."
    }
  ];

const faqs = [
  {
    question: "What is a GoLite Mobile Family & Multi-Line Plan?",
    answer: "A Family & Multi-Line Plan lets you combine multiple GoLite Mobile Personal Plans - prepaid, postpaid, or both - into one account. Enjoy shared data, unlimited talk and text, discounts on additional lines, and a single dashboard to manage it all."
  },
  {
    question: "Can I mix prepaid and postpaid plans in the same family account?",
    answer: "Yes! You can mix and match prepaid and postpaid plans however you like. This flexibility lets each family member choose the plan that best fits their needs."
  },
  {
    question: "How many lines can I add to one account?",
    answer: "You can add up to 10 lines to your Family & Multi-Line Plan. And the more lines you add, the more you save."
  },
  {
    question: "Is data really shared across all lines?",
    answer: "Yes. Your group shares one pool of high-speed data, which means no more wasted data on underused lines. Everyone gets what they need, when they need it."
  },
  {
    question: "What’s the difference between Go-Steady and Go-Flex plans?",
    answer: (<ul><li><strong>Go-Steady</strong> is a postpaid plan that costs $37/month per line. It includes 9GB of high-speed data, 900MB of hotspot access, and comes with optional 12- or 24-month contracts. It’s ideal for families that need consistent, reliable connectivity.</li><li><strong>Go-Flex</strong> is a prepaid plan at $18/month per line. It includes 3GB of high-speed data, 500MB of hotspot access, and has no contracts. Perfect for those who want budget-friendly flexibility with no long-term commitment.</li></ul>)
  },
  {
    question: "Do I have to sign a contract?",
    answer: (
      <><p>Not necessarily.</p><ul><li><strong>Go-Flex</strong> (prepaid) is contract-free with simple 30-day plans.</li><li><strong>Go-Steady</strong> (postpaid) offers optional 12- or 24-month contracts if you prefer long-term stability and benefits.</li></ul></>
    )
  },
  {
    question: "What happens if I use up all my high-speed data?",
    answer: "Your service will continue at reduced speeds (128kbps), or you can easily purchase additional high-speed data anytime through your dashboard."
  },
  {
    question: "Can I make international calls?",
    answer: "Yes! Every GoLite Mobile plan includes unlimited free international calling to over 220 countries - no extra charges or hidden fees."
  },
  {
    question: "Can I use my phone while traveling?",
    answer: (<ul><li><strong>Domestic roaming</strong> is included for free.</li><li><strong>International roaming</strong> is available on select plans for an additional fee. You can enable it through your dashboard.</li></ul>)
  },
  {
    question: "How do I start a Family Plan?",
    answer: (<>
    <p>It’s easy:</p>
    <ol><li>Choose your plans - prepaid, postpaid, or both</li><li>Add up to 10 lines</li><li>Activate your SIMs or eSIMs at <a href="https://golitemobile.com/activate-sim/">Activate</a></li><li>Manage everything using the <strong>My GoLite Mobile</strong> app or website</li></ol>
    
    </>)
  },
  {
    question: "Can I keep my current phone number?",
    answer: "Yes, you can switch between plans anytime through your GoLite Mobile account. Changes take effect at the start of your next billing cycle."
  },
  {
    question: "Can I bring my own phone?",
    answer: "Absolutely. Most unlocked devices - including eSIM-capable phones - are compatible with GoLite Mobile. Check compatibility during activation."
  },
  {
    question: "How do I manage all the lines on my account?",
    answer: (<>
    <p>Use <strong>My GoLite Mobile</strong>, your all-in-one dashboard where you can:</p>
    <ul><li>View usage per line</li><li>Pay your bill</li><li>Add or remove lines</li><li>Set data limits or alerts</li><li>Access parental controls</li></ul>
    </>)
  },
  {
    question: "Are there parental controls?",
    answer: "Yes! You can set screen time limits, filter content, and control data usage for each line - ideal for families with kids."
  },
  {
    question: "What kind of support does GoLite Mobile offer?",
    answer: (<>
    <p>We're available 24/7 to help you out:</p>
    <ul><li><strong>Call us</strong> at 800-801-9385</li><li><strong>Live Chat</strong> at <a href="https://golitemobile.com/help-and-support/">Support</a></li></ul>
    <p><strong>Help Center</strong> online with FAQs and setup guides</p>
    </>)
  },
  {
    question: "Is GoLite Mobile eco-friendly?",
    answer: "Yes! Every GoLite Mobile plan supports global ocean conservation efforts. When you join us, you’re helping protect the planet."
  },
 
  
];
  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);
  return (
    <>
    
      <Header />


      {/* Banner Section */}
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"> */}
          <h2 className="text-3xl font-bold text-center p-4">
          Shop Prepaid Family & Multi-Line Plans
          </h2>
        {/* </h1> */}

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
<CustomFamilyPlansComponent />

{/* SIM Type Tabs */}
<section className="max-w-7xl mx-auto py-12">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center">
        Know your Plans
      </h2>
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
      <div className="px-4 md:px-20 mt-10 relative">
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

</section>
      {/* Benefits Section */}
          <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-[32px] font-bold text-gray-900 mb-10 leading-tight">
            Why Choose a GoLite Mobile<br />Family Plan?
          </h2>

          <ul className="space-y-7">
            {features.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                
                {/* ICON */}
                <div className="w-15 h-15 rounded-2xl bg-[#FF57221A] flex items-center justify-center text-orange-500 text-lg font-semibold">
                  {item.Icon && <item.Icon className="w-8 h-8 color-[#FF5722]" />}
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-md text-[1rem]">
                    {item.desc}
                  </p>
                </div>

              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src="/img/familyFeatures.png"
            alt="GoLite family plan"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
    {/* Benefits Section */}


<div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-3xl font-bold text-center text-gray-900 mb-4">
          How to Get Started
        </h2>
        <p className="text-gray-600 text-center mb-12">Setting up your family plan is quick and easy</p>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {getStarted.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-[#e8e7e7] rounded-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white mb-6">
                <span className="text-3xl font-bold">{index + 1}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>



    <div className="bg-gray-50 pb-12">
      <h2 className="text-4xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md bg-white shadow-sm py-4">
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
                <div className="border border-gray-200 rounded-md bg-white shadow-sm py-4">
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
