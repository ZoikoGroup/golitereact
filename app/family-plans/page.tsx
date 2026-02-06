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

import PlanSlider from "../components/PlanSlider";

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
    answer:
      "A Family & Multi-Line Plan lets you combine multiple GoLite Mobile personal plans (prepaid, postpaid, or both) into one account. You get shared data, unlimited talk & text, discounts on extra lines, and a single dashboard to manage everything."
  },
  {
    question: "Can I mix prepaid and postpaid plans in the same family account?",
    answer:
      "Yes! You can mix prepaid and postpaid plans so each family member can choose the plan that fits their needs."
  },
  {
    question: "How many lines can I add to one account?",
    answer:
      "You can add up to 10 lines to a Family & Multi-Line Plan. Additional lines increase overall savings."
  },
  {
    question: "Is data really shared across all lines?",
    answer:
      "Yes. All lines share one pool of high-speed data, helping prevent unused data on individual lines."
  },
  {
    question: "What’s the difference between Go-Steady and Go-Flex plans?",
    answer:
      "Go-Steady is a postpaid plan costing $37/month per line with 9GB high-speed data, 900MB hotspot access, and optional 12 or 24-month contracts. Go-Flex is a prepaid plan costing $18/month per line with 3GB high-speed data, 500MB hotspot access, and no contract."
  },
  {
    question: "Do I have to sign a contract?",
    answer:
      "No. Go-Flex prepaid plans are contract-free with 30-day billing cycles. Go-Steady postpaid plans offer optional 12 or 24-month contracts."
  },
  {
    question: "What happens if I use up all my high-speed data?",
    answer:
      "Your service continues at reduced speeds (128kbps), or you can purchase additional high-speed data through your dashboard."
  },
  {
    question: "Can I make international calls?",
    answer:
      "Yes! All GoLite Mobile plans include free international calling to 220+ countries."
  },
  {
    question: "Can I use my phone while traveling?",
    answer:
      "Domestic roaming is included for free. International roaming is available on select plans for an additional fee and can be enabled through your dashboard."
  },
  {
    question: "How do I start a Family Plan?",
    answer:
      "1. Choose prepaid, postpaid, or mixed plans. 2. Add up to 10 lines. 3. Activate SIM or eSIM. 4. Manage lines through the My GoLite Mobile app or website."
  },
  {
    question: "Can I keep my current phone number?",
    answer:
      "Yes. You can transfer your number or switch plans anytime through your GoLite Mobile account. Changes apply during the next billing cycle."
  },
  {
    question: "Can I bring my own phone?",
    answer:
      "Yes. Most unlocked and eSIM-capable phones are compatible with GoLite Mobile. Compatibility can be checked during activation."
  },
  {
    question: "How do I manage all the lines on my account?",
    answer:
      "Use the My GoLite Mobile dashboard to view usage per line, pay bills, add or remove lines, set data limits, create alerts, and manage parental controls."
  },
  {
    question: "Are there parental controls?",
    answer:
      "Yes! You can set screen time limits, filter content, and control data usage for each line."
  },
  {
    question: "What kind of support does GoLite Mobile offer?",
    answer:
      "GoLite Mobile provides 24/7 support via phone (800-801-9385), live chat, and an online Help Center with setup guides and FAQs."
  },
  {
    question: "Is GoLite Mobile eco-friendly?",
    answer:
      "Yes! Every GoLite Mobile plan contributes to global ocean conservation efforts."
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
    <div className="dark:bg-gray-900 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"> */}
          <h2 className="text-3xl font-bold text-center p-4 dark:text-gray-100">
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

<PlanSlider/>

      {/* Benefits Section */}
          <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-[32px] font-bold dark:text-gray-100 text-gray-900 mb-10 leading-tight">
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
                  <h3 className="text-base font-semibold dark:text-gray-100 text-gray-900 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm dark:text-gray-300 text-gray-600 mt-1 leading-relaxed max-w-md text-[1rem]">
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


<div className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-3xl font-bold text-center dark:text-gray-100 text-gray-900 mb-4">
          How to Get Started
        </h2>
        <p className="dark:text-gray-300 text-gray-600 text-center mb-12">Setting up your family plan is quick and easy</p>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {getStarted.map((feature, index) => (
            <div 
              key={index}
              className="dark:bg-gray-800 bg-white border-2 border-[#e8e7e7] rounded-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white mb-6">
                <span className="text-3xl font-bold">{index + 1}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="dark:text-gray-300 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>



    <div className="dark:bg-gray-900 bg-gray-50 pb-12">
      <h2 className="text-4xl md:text-3xl font-bold text-center dark:text-gray-100 text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md bg-white shadow-sm py-4 dark:bg-gray-800">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
                    <span className="dark:text-gray-100">{item.question}</span>
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
                  <DisclosurePanel className="px-4 py-3 dark:text-gray-300 text-gray-700 break-words">
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
                <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm py-4">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
                    <span className="dark:text-gray-100">{item.question}</span>
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
                  <DisclosurePanel className="px-4 py-3 dark:text-gray-300 text-gray-700 break-words">
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
