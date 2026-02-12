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
import BusinessBuyNowModal from "../components/BusinessBuyNowModal";
import { BarChart3, FileText, Smartphone, Users, Lock } from 'lucide-react';
import TestimonialSlider from "../components/TestimonialSlider";


type Testimonial = {
  bg: string;
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const features: Feature[] = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics',
      description: 'Get real-time insights into your business performance with advanced analytics tools.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Easy Billing',
      description: 'Streamline your payment processes with integrated billing solutions.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile First',
      description: 'Access your business tools anywhere, anytime with our mobile-optimized platform.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Management',
      description: 'Collaborate effectively with built-in team management features.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure',
      description: 'Bank-level security to keep your business data safe and protected.',
    },
  ];

interface Stat {
  value: string;
  label: string;
}

  const stats: Stat[] = [
    {
      value: '24/7',
      label: 'Customer Support',
    },
    {
      value: '99%',
      label: 'Customer Satisfaction',
    },
    {
      value: '99.9%',
      label: 'Uptime Guarantee',
    },
    {
      value: '2000+',
      label: 'Active Businesses',
    },
  ];

  


/* ---------- Types ---------- */
type Plan = {
  id: number;
  name: string;
  vcPlanID: string;
  slug: string;
  short_description: string;
  final_price: number;
  price_24: number | null;
  duration_days: number;
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

      const [openBuyModal, setOpenBuyModal] = useState(false);
      const [selectedPlan, setSelectedPlan] = useState<any>(null);

      const handleBuyPlan = (plan:any) => {
        setSelectedPlan(plan);
        setOpenBuyModal(true);
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



    const normalizedPlans = plans.map(p => ({
  id: p.id,
  title: p.name,
  vcPlanID: p.vcPlanID,
  slug: p.slug,
  desc: p.short_description,
  price: p.final_price,
  final_price: p.final_price,
  price_24: p.price_24,
  duration_days: p.duration_days,
  simType: p.sim_type === "esim" ? "eSim" : "pSim",
  tag: p.is_popular ? "Most Popular" : null,
  features: p.features?.map(f => f.title) || [],
}));



    
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if (width <= 640) {
            setSlidesToShow(1);
          } else if (width <= 1024) {
            setSlidesToShow(3);
          } else {
            setSlidesToShow(4);
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
          
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
  
  

const faqs = [
  {
    question: "What are GoLite Mobile Business Plans?",
    answer:
      "GoLite Mobile provides four business plans designed for companies with varying data and communication needs: ✔ GoLite Business Essentials – 15GB of high-speed data, unlimited calls, and texts for small teams. ✔ GoLite Business Advanced – 25GB of high-speed data for growing businesses. ✔ GoLite Business Pro – 35GB of high-speed data for moderate-to-heavy data users. ✔ GoLite Business Ultra – 45GB of high-speed data for top-tier connectivity and performance."
  },
  {
    question: "Who should choose a GoLite Mobile Business Plan?",
    answer:
      "These plans are ideal for: ✔ Small businesses needing reliable phone and data access. ✔ Remote teams and freelancers requiring flexible wireless service. ✔ Medium and large businesses that need scalable mobile solutions."
  },
  {
    question: "Is a contract required for GoLite Business Plans?",
    answer:
      "No, all GoLite Business Plans are contract-free. You can modify or cancel your plan at any time without penalties."
  },
  {
    question: "How do GoLite Business Plans compare to Verizon, AT&T, and T-Mobile?",
    answer:
      "✔ Competitive pricing – More affordable than major carriers. ✔ Transparent billing – No hidden fees or surprises. ✔ Flexible plans – Upgrade, downgrade, or cancel anytime. ✔ Nationwide coverage – Access to a robust 5G & 4G LTE network."
  },
  {
    question: "Can I mix and match different plans for my employees?",
    answer:
      "Yes, businesses can customize their wireless solutions by selecting different plans for different team members based on their usage and data needs."
  }
];


function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0 text-emerald-400"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8.5L6.5 12L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
  return (
    <>
    <Header />
    {/* Banner Section */}
    <section className="relative bg-gradient-to-br from-green-50 via-green-100/80 to-green-200 py-10 px-6 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid md:grid-cols-3 gap-12 items-center">
      
      {/* Left Content - Takes 2 columns */}
      <div className="space-y-6 md:col-span-2">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Empower Your Business<br />
          with <span className="text-[#00B56F]">GoLite Mobile</span>
        </h1>
        
        <p className="text-gray-600 text-lg max-w-2xl">
          Streamline operations, boost productivity, and grow your business with our comprehensive mobile solutions.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg">
            Explore Business Plans
          </button>
          
          <button className="bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition">
            Conatct Sales
          </button>
        </div>
      </div>

      {/* Right Image - Takes 1 column */}
      <div className="relative flex justify-center items-center md:col-span-1">
        <Image
          src="/businessBanner.png"
          alt="Business Growth Illustration"
          width={600}
          height={400}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  </div>
</section>
    {/* END Banner Section */}
    
    <section className="py-16 px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Manage Your Business Needs with Ease
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed pr-24">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

 <section className="bg-gradient-to-r from-[#00D084] to-[#00B56F] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {/* Value */}
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              
              {/* Label */}
              <p className="text-white/90 text-sm md:text-base font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* SIM Type Tabs */}
      <div className="w-full bg-gray-50 py-8">
        <h1 className="text-center text-[28px] md:text-[2.5rem] font-bold text-[#1d1d1f]">
          Shop Postpaid Business Plans
        </h1>
      </div>
      <div className="flex justify-center dark:bg-gray-900 bg-gray-50 ">
        <div className="inline-flex bg-[#00B56F] rounded-full mt-6 p-1 w-[35rem] h-[4rem]">

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
              ? "bg-white text-[#00B56F] dark:bg-gray-800 dark:text-white" 
              : "text-white"}
              `}
            >
            {simType === "pSim" ? "Physical Sim" : "eSim"}
            </button>
          ))}

        </div>
      </div>

      {/* Slider with Navigation */}
      <div className="px-4 md:px-6  relative dark:bg-gray-900 bg-gray-50 py-12">
        

        <Slider key={slidesToShow} ref={sliderRef} {...sliderSettings} className="my-4">
          {normalizedPlans.map((plan, idx) => (
            <div key={idx} className="px-8 py-4 ">
              <div className={`relative flex flex-col w-full rounded-3xl min-h-[43rem] bg-white px-6 pb-6 shadow-sm transition-shadow ${plan.tag ? "border-2 border-emerald-400" : "border border-gray-200" }`}
              >
                {/* Diagonal Ribbon Tag */}
                {plan.tag && (
                  
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-emerald-400 px-5 py-1.5 text-sm font-semibold text-white whitespace-nowrap">
                    {plan.tag}
                  </span>
                </div>
                )}

                {/* Plan Title */}
                <h3 className="text-xl lg:text-[1.2vw] font-semibold mb-2 text-center mt-8 dark:text-white">{plan.title}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-emerald-400">
                    ${plan.price}.00
                  </span>
                  <span className="text-sm font-medium text-gray-500">/month</span>
                </div>

                {/* Divider */}
                <hr className="my-2 border-gray-100" />

                {/* Description */}
                <p className="dark:text-gray-400 text-gray-500 mb-4 text-left pt-6 text-sm">{plan.desc}</p>

                {/* Features */}
                <ul className="flex flex-col divide-y divide-gray-100 flex-1">
                  {plan.features.map((f, i) => (

                    <li key={f} className="flex items-center gap-3 py-3">
                      <CheckIcon />
                      <span className="text-sm font-medium text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                  {/* Button */}

                <button
                  onClick={() => handleBuyPlan(plan)}
                  className="mt-6 w-full rounded-xl bg-emerald-400 py-2 text-base font-bold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-600"
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </Slider>
        </div>
        
          <TestimonialSlider bg="bg-gradient-to-br from-[#F8F9FA] to-[#E3F2FD]" />
        
        


 <div className="dark:bg-gray-900 bg-gray-50 py-6">
  <h1 className="text-center text-[2rem] md:text-[2rem] font-bold text-[#1d1d1f] py-4">
          Frequently Asked Questions
        </h1>
  
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        
        <div className="flex-1 flex flex-col gap-4">
          {faqs.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-xl py-2 dark:bg-gray-800 bg-white shadow-xl">
                  <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium dark:text-white text-gray-800 focus:outline-none">
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

    <BusinessBuyNowModal
      open={openBuyModal}
      onClose={() => setOpenBuyModal(false)}
      plan={selectedPlan}
      simType={activeSimType}
    />

    <Footer />
    </>
  );
}