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

import BuyNowPopup from "../components/BuyNowModal";


/* ---------- Types ---------- */
type Plan = {
  id: number;
  name: string;
  vcPlanID: string;
  slug: string;
  short_description: string;
  final_price: number;
  is_popular: boolean;
  sim_type: "esim" | "psim";
  features: { title: string }[];
};

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

export default function PostpaidPlansHero({ plans }: { plans: Plan[] }) {
      const [activeSimType, setActiveSimType] = useState("eSim");
      const [slidesToShow, setSlidesToShow] = useState(3);
      const sliderRef = useRef<any>(null);

      const [showPopup, setShowPopup] = useState(false);
      const [selectedPlan, setSelectedPlan] = useState<any>(null);


    const handleBuyNow = (plan: any, simType: string) => {
      setSelectedPlan({
        ...plan,
        simType: simType,   // store chosen SIM type
      });
      setShowPopup(true);
    };




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
  vcPlanID: p.vcPlanID,
  slug: p.slug,
  desc: p.short_description,
  price: `$${p.final_price}/mo`,
  final_price: p.final_price,
  tag: p.is_popular ? "Most Popular" : null,
  features: p.features?.map(f => f.title) || [],
}));



    
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
    
      const plans2 = [
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
    
      //const filteredPlans = plans.filter((p) =>  p.simType === activeSimType);
    
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
      href: "/students-discount-application",
    },
    {
      title: "Senior Saver",
      desc: "Simplified plans with dedicated support for seniors 60+",
      gradient: "from-[#F093FB] to-[#F5576C]",
      href: "/senior-citizen-discount-enrollment-form",
    },
    {
      title: "Work-Life Unlimited",
      desc: "Business features with personal benefits in one plan",
      gradient: "from-[#4FACFE] to-[#00F2FE]",
       href: "/business",
    },
    {
      title: "Family Bundle",
      desc: "Connect up to 5 lines with shared data and savings",
      gradient: "from-[#43E97B] to-[#38F9D7]",
       href: "/family-plans",
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
       href: "/travel-plans",
    },
  ];
  
const faqs = [
  {
    question: "What are GoLite Mobile Postpaid Plans?",
    answer:
      "GoLite Mobile Postpaid Plans offer premium unlimited wireless service with flexible 12 or 24-month contracts, world-class 5G coverage, and free international calling to 200+ countries. Unlike prepaid, you pay at the end of each billing cycle."
  },
  {
    question: "What makes GoLite Mobile Postpaid Plans different?",
    answer:
      "✔ Same premium network as AT&T – Nationwide 5G & 4G LTE. ✔ Truly unlimited data – No overages or slowdowns. ✔ Flexible contract terms – Choose 12 or 24 months. ✔ Device financing & upgrade programs. ✔ Exclusive multi-line & business discounts. ✔ Supports marine conservation."
  },
  {
    question: "What do all GoLite Mobile Postpaid Plans include?",
    answer:
      "✔ Unlimited calls & texts across the USA. ✔ Unlimited high-speed 5G & 4G LTE data. ✔ 1,250 free international calling minutes per month. ✔ Mobile hotspot capabilities. ✔ Wi-Fi calling & VoLTE support. ✔ 24/7 premium customer support."
  },
  {
    question: "What are the contract options?",
    answer:
      "✔ 12-month contract – More flexibility and earlier upgrade eligibility. ✔ 24-month contract – Best value with lower monthly payments."
  },
  {
    question: "What happens if I use all 1,250 international minutes?",
    answer:
      "You can purchase additional international calling minutes through the website or mobile app."
  },
  {
    question: "Can I use my phone internationally?",
    answer:
      "Yes! International roaming is available in 100+ countries with optional international data passes."
  },
  {
    question: "Can I add multiple lines to a postpaid plan?",
    answer:
      "Yes! Family and Business plans allow multiple lines with discounted pricing."
  },
  {
    question: "Can I finance a smartphone with GoLite Mobile?",
    answer:
      "Yes! Device financing is available for smartphones like iPhone, Samsung, and Google Pixel with affordable monthly payments."
  },
  {
    question: "When can I upgrade my phone?",
    answer:
      "You can upgrade after 12 months on a 24-month contract or after 6 months through select early upgrade programs."
  },
  {
    question: "What if I want to cancel my contract early?",
    answer:
      "Early cancellation may require paying an early termination fee (ETF) and settling any remaining device payments. Some customers may qualify for contract buyout programs."
  },
  {
    question: "Does GoLite Mobile offer business postpaid plans?",
    answer:
      "Yes! Business plans include multi-line team discounts, priority network access, dedicated account managers, and business roaming packages."
  },
  {
    question: "How many lines can I add to a business plan?",
    answer:
      "You can add up to 50 lines with customized pricing based on business requirements."
  },
  {
    question: "What network does GoLite Mobile use?",
    answer:
      "GoLite Mobile operates on AT&T’s premium nationwide 5G & 4G LTE network."
  },
  {
    question: "Does GoLite Mobile Postpaid include 5G access?",
    answer:
      "Yes! 5G access is included at no additional cost."
  },
  {
    question: "Will my service work in rural or coastal areas?",
    answer:
      "Yes! Coverage is available across cities, rural regions, and coastal areas."
  },
  {
    question: "How does billing work?",
    answer:
      "Postpaid plans are billed at the end of each monthly billing cycle, and you will receive an invoice with all charges."
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "✔ Credit/Debit Cards. ✔ PayPal. ✔ AutoPay (recommended) – Includes discount benefits."
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No. GoLite Mobile maintains transparent pricing with no hidden charges."
  },
  {
    question: "How do I activate my GoLite Mobile Postpaid service?",
    answer:
      "1. Choose your plan and contract length. 2. Get your SIM or eSIM. 3. Complete activation through the website or mobile app."
  },
  {
    question: "Can I keep my current phone number?",
    answer:
      "Yes! Number porting is free and easy."
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
    <div className=" dark:bg-gray-900 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 text-center mb-12">
          Shop Postpaid Plans
        </h1>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content Section */}
            <div className="bg-orange-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-6 leading-tight">
                Explore our postpaid SIM only plans to find value for-money deals
              </h2>
              <p className="text-white text-lg md:text-[1.2rem] leading-relaxed">
                Get ultra-fast 5G speeds. Switch to our most popular postpaid plans. Enjoy great perks with every postpaid SIM only plan, no credit check required.
              </p>
            </div>

            {/* Right Image Section */}
            
            <div className="relative h-64 md:h-auto">
              <img
                src="./img/postpaidBanner.png"
                alt="Three friends looking at a smartphone together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* END Banner Section */}
    
{/* SIM Type Tabs */}
      <div className=" dark:bg-gray-900 flex justify-center">
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
            ? "bg-white text-[#FD4C0E] dark:bg-gray-900 dark:text-white" 
            : "text-white"}
        `}
      >
        {simType === "pSim" ? "pSIM" : "eSIM"}
      </button>
    ))}

  </div>
</div>

      {/* Slider with Navigation */}
      <div className="px-4 md:px-40  relative dark:bg-gray-900 bg-gray-50 py-12">
        {/* Custom Arrow Buttons */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-700 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#FD4C0E]" />
        </button>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-700 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#FD4C0E]" />
        </button>

        <Slider key={slidesToShow} ref={sliderRef} {...sliderSettings} className="my-4">
          {normalizedPlans.map((plan, idx) => (
            <div key={idx} className="px-8 dark">
              <div
                className={`relative border p-6 rounded-2xl shadow-sm min-h-[45vw] overflow-hidden ${
                  plan.tag ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-gray-900"
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
                <p className="dark:text-gray-400 mb-4 text-center text-sm">(taxes and fees included)</p>

                {/* Button */}

                <button
                  onClick={() => handleBuyNow(plan, activeSimType)}
                  className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
                >
                  Buy Plan
                </button>


                {/* Description */}
                <p className="dark:text-gray-300 text-gray-500 mb-4 text-left pt-6 text-sm">{plan.desc}</p>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-gray-700 text-sm lg:h-[20vw] md:h-[20vw]">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 dark:text-gray-300 text-gray-600">
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

        <div className="dark:bg-gray-900 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold dark:text-gray-100 text-center mb-12 px-4">
          Best Postpaid Mobile Plans With Many Exciting Benefits
        </h1>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="dark:bg-gray-800 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className={`w-[5rem] h-[5rem]   flex items-center justify-center mb-6`}>
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-4 leading-snug">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className=" dark:text-gray-300 text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>


<section className="w-full py-16 dark:bg-gray-900 bg-white">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-900">
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
              href={c.href}
              className="mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline"
            >
              View Plans →
            </a>
          </div>
        ))}
      </div>
    </section>
 <div className="bg-gray-50 py-10 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium dark:text-gray-100 text-gray-800 focus:outline-none">
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
                  <DisclosurePanel className="px-4 py-3 text-gray-700 break-words dark:text-gray-400">
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
                <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium dark:text-gray-100 text-gray-800 focus:outline-none">
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
                  <DisclosurePanel className="px-4 py-3 text-gray-700 break-words dark:text-gray-400">
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

{showPopup && (
  <BuyNowPopup
  open={showPopup}
  onClose={() => setShowPopup(false)}
  plan={selectedPlan}
  simType={selectedPlan?.simType}
/>
)}


    </>
  );
}