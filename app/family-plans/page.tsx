"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
  const FamilyPlans: Plan[] = [
    { name: "Go-Flex-Family", duration: "30 Days", simType: "eSIM", price: 18 },
    { name: "Go-Value-Family", duration: "30 Days", simType: "eSIM", price: 39 },
    { name: "Go-Prime-Family", duration: "30 Days", simType: "eSIM", price: 59 },
    { name: "Go-Flex-Family", duration: "30 Days", simType: "pSIM", price: 18 },
    { name: "Go-Value-Family", duration: "30 Days", simType: "pSIM", price: 39 },
    { name: "Go-Prime-Family", duration: "30 Days", simType: "pSIM", price: 59 },
  ];

  const [primaryKey, setPrimaryKey] = useState<string | null>(null);
  const [additionalLines, setAdditionalLines] = useState(0);
  const [linePlans, setLinePlans] = useState<string[]>([]);

  /* Sync additional line dropdowns */
  useEffect(() => {
    setLinePlans((prev) =>
      additionalLines > prev.length
        ? prev.concat(Array(additionalLines - prev.length).fill(""))
        : prev.slice(0, additionalLines)
    );
  }, [additionalLines]);

  const getPlanByKey = (key: string) =>
    FamilyPlans.find((p) => `${p.name}-${p.simType}` === key);

  /* 🔥 BILLING + SUMMARY LOGIC */
  const calculateSummary = () => {
    const primaryPlan = primaryKey ? getPlanByKey(primaryKey) : null;

    const additionalLinesDetails: {
      name: string;
      simType: string;
      price: number;
    }[] = [];

    const planCounts: Record<Plan["name"], number> = {
      "Go-Flex-Family": 0,
      "Go-Value-Family": 0,
      "Go-Prime-Family": 0,
    };

    let additionalSubtotal = 0;

    linePlans.forEach((key) => {
      if (!key) return;
      const plan = getPlanByKey(key);
      if (!plan) return;

      additionalSubtotal += plan.price;
      planCounts[plan.name]++;

      additionalLinesDetails.push({
        name: plan.name,
        simType: plan.simType,
        price: plan.price,
      });
    });

    let totalDiscount = 0;
    (Object.entries(planCounts) as [Plan["name"], number][]).forEach(
      ([planName, count]) => {
        for (let i = 1; i <= count; i++) {
          totalDiscount += discountTable[i][planName];
        }
      }
    );

    const primaryPrice = primaryPlan?.price || 0;

    return {
      primaryPlan,
      additionalLinesDetails,
      primaryPrice,
      discount: totalDiscount,
      total: Math.max(primaryPrice + additionalSubtotal - totalDiscount, 0),
    };
  };

  const summary = calculateSummary();
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

<div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center">
            Create Your Family Plan
          </h2>
          <p className="text-gray-600 text-base lg:text-lg mt-2">
            Build a custom plan for your family. Select number of lines and choose your base plan.
          </p>
        </div>


      <div className=" py-14 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2  p-6 rounded-xl bg-gray-100">
            <h3 className="text-xl font-bold mb-4">Select Primary Plan</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FamilyPlans.map((p) => {
                const key = `${p.name}-${p.simType}`;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setPrimaryKey(key);
                      setAdditionalLines(0);
                    }}
                    className={`relative p-4 border-2 rounded-lg cursor-pointer w-full max-w-sm rounded-2xl border border-gray-200 px-6 py-5 ${
                      primaryKey === key
                        ? "border-orange-500 bg-[#FF5722] text-white hover:border-orange-500"
                        : "border-gray-200 bg-white hover:border-orange-500 text-gray-800 hover:bg-orange-50"
                    }`}
                  >
                    {primaryKey === key && (
                      <Check className="absolute top-3 right-3 text-[#FF5722] bg-white border border-[#FF5722] rounded-full" />
                    )}
                   
                  <h3 className="text-base font-semibold mb-4 ">{p.name}</h3>
                  


                    {/* Rows */}
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-[130px_10px_1fr]">
                        <span>Call Duration</span>
                        <span> : </span>
                        <span className="font-medium">30 Days</span>
                      </div>

                      <div className="grid grid-cols-[130px_10px_1fr]">
                        <span>SIM Type</span>
                        <span> : </span>
                        <span className="font-medium">{p.simType}</span>
                      </div>

                      <div className="grid grid-cols-[130px_10px_1fr]">
                        <span>Price</span>
                        <span> : </span>
                        <span className="font-medium">${p.price}</span>
                      </div>
                    </div>
                  </div>
             );     
              })}
            </div>

            {/* ADDITIONAL LINES */}
            <div className="relative  flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4 mt-4">
              <label className="text-gray-800 font-semibold text-sm lg:text-base whitespace-nowrap">
                Choose the number of additional Lines : 
              </label>
              <select
                disabled={!primaryKey}
                value={additionalLines}
                onChange={(e) => setAdditionalLines(Number(e.target.value))}
                className="w-full appearance-none px-4 pr-14 py-2.5 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base"
              >
                <option value={0}>Choose the Number of Additional Lines</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} Line{ i + 1 > 1 ? "s" : "" }
                  </option>
                ))}
              </select>
              <span
  className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 ${
    !primaryKey ? "text-gray-300" : "text-gray-400"
  }`}
>
  ▼
</span>
            </div>

            {additionalLines > 0 && (
              <div className="mt-6 space-y-3">
                {linePlans.map((val, i) => (
                    <div key={i} className="relative">
                      <select
                        value={val}
                        onChange={(e) => {
                          const copy = [...linePlans];
                          copy[i] = e.target.value;
                          setLinePlans(copy);
                        }}
                        className="w-full appearance-none px-4 pr-14 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
                      >
                        <option value="">Select Plan</option>
                        {FamilyPlans.map((p) => {
                          const key = `${p.name}-${p.simType}`;
                          return (
                            <option key={key} value={key}>
                              {p.name} ({p.simType}) – ${p.price}
                            </option>
                          );
                        })}
                      </select>
                      {/* Arrow with space from right */}
                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                        ▼
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="lg:col-span-1">
            
            <div className="bg-white p-6 rounded-xl sticky top-6  border-[3px] border-[#d3cbcb] rounded-[12px]">
              <h3 className="text-xl flex items-center justify-center font-bold mb-4">Your Plan Summary</h3>

              {summary.primaryPlan && (
                <div className="mb-4">
                  <p className="font-semibold mb-1">Primary Line</p>
                  <div className="flex justify-between text-sm">
                    <span>
                      {summary.primaryPlan.name} ({summary.primaryPlan.simType})
                    </span>
                    
                    <span>${summary.primaryPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {summary.additionalLinesDetails.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold mb-1">Additional Lines</p>
                  <div className="space-y-2 text-sm">
                    {summary.additionalLinesDetails.map((line, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {line.name} ({line.simType})
                        </span>
                        <span>${line.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {summary.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 mb-3">
                  <span>Total Discount</span>
                  <span>- ${summary.discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="my-3 text-gray-300 mb-4" />

              

              <div className="max-w-sm mx-auto rounded-2xl bg-gray-50 shadow-sm px-4 py-10 text-center">
      
                <p className="text-sm text-gray-500 mb-3">
                  Total Monthly Cost:
                </p>

                <p className="text-[42px] font-bold text-orange-500 leading-none mb-3">
                  ${summary.total.toFixed(2)}
                </p>

                <p className="text-sm text-gray-400">
                  Taxes and fees included
                </p>

              </div>

              <button
                disabled={!primaryKey}
                className="mt-6 w-full bg-[#FF5722] text-white py-3 rounded-lg disabled:opacity-50"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  

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



    <div className="bg-gray-50 mb-12">
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
