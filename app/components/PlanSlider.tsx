"use client";

import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import BuyNowModal from "../components/BuyNowModal";
import PrepaidBuyNowModal from "../components/PrepaidBuyNowModal";

const customStyles = `
.slick-dots li button:before {
  font-size: 10px; color: #d1d1d1; opacity: 1;
}
.slick-dots li.slick-active button:before { color: #ff6600 !important; }
.slick-dots li.slick-active .dots { background: #fd4c0e; width: 1.3vw; }
`;

export default function PricingPlans() {
  const router    = useRouter();
  const sliderRef = useRef<any>(null);

  const [activeCategory, setActiveCategory] = useState("prepaid");
  const [slidesToShow,   setSlidesToShow]   = useState(3);
  const [plans,          setPlans]          = useState<any[]>([]);
  const [plansLoading,   setPlansLoading]   = useState(true);

  const [showPostpaidModal, setShowPostpaidModal] = useState(false);
  const [showPrepaidModal,  setShowPrepaidModal]  = useState(false);
  const [selectedPlan,      setSelectedPlan]      = useState<any>(null);

  const getViewAllUrl = () => {
    switch (activeCategory) {
      case "prepaid":  return "/prepaid-plans";
      case "postpaid": return "/postpaid-plans";
      case "travel":   return "/travel-plans";
      case "business": return "/business";
      default:         return "/";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 640) setSlidesToShow(1);
      else if (w <= 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBuyPlan = (plan: any) => {
    setSelectedPlan(plan);
    if (activeCategory === "postpaid") { setShowPostpaidModal(true); return; }
    if (activeCategory === "prepaid")  { setShowPrepaidModal(true);  return; }
    // travel / business — use same multi-step modal
    setShowPostpaidModal(true);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plans/v1/`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setPlans(data.map((item: any) => ({
          id:           item.id,
          slug:         item.slug,
          vcPlanID:     item.vcPlanID,
          title:        item.name,
          desc:         item.short_description,
          final_price:  item.final_price,
          price_24:     item.price_24,
          duration_days: item.duration_days || "",
          category:     item.category.slug.replace("-plans", "").replace("-", ""),
          tag:          item.is_popular ? "Most Popular" : null,
          features:     item.features.map((f: any) => f.title),
        })));
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((p) => p.category === activeCategory);

  const sliderSettings = {
    dots: true, infinite: true, speed: 500,
    slidesToShow, slidesToScroll: 1, arrows: false,
    customPaging: () => <div className="h-2 w-2 bg-gray-300 rounded-full mx-1 mt-2 dots" />,
    dotsClass: "slick-dots flex justify-center",
  };

  return (
    <>
      <div className="w-full dark:bg-gray-900 bg-white py-10">
        <style>{customStyles}</style>

        <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">
          Shop Sustainable Plans
        </h2>

        {/* Category Tabs */}
        <div className="flex justify-center mb-4 px-4">
          <div className="inline-flex bg-[#FD4C0E] rounded-full p-1 w-full max-w-4xl">
            {["prepaid", "postpaid", "travel", "business"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-full capitalize transition-all ${
                  activeCategory === tab
                    ? "bg-white text-[#FD4C0E] dark:bg-gray-900"
                    : "text-white"
                }`}
              >
                <span className="hidden sm:inline">{tab} Plans</span>
                <span className="sm:hidden">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* eSIM/pSIM tabs removed — handled inside BuyNowModal */}

        <div className="px-4 md:px-40 mt-10 relative">
          {plansLoading && (
            <p className="text-center text-gray-500 py-10">Loading plans...</p>
          )}

          {!plansLoading && filteredPlans.length > 0 && (
            <>
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-900 bg-white rounded-full p-3 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-[#FD4C0E]" />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-900 bg-white rounded-full p-3 shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-[#FD4C0E]" />
              </button>

              <Slider ref={sliderRef} {...sliderSettings}>
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="px-12">
                    <div className="relative border p-6 rounded-2xl shadow-sm dark:bg-gray-900 bg-white min-h-[40vw]">
                      {plan.tag && (
                        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                          <span className="absolute top-7 -right-8 rotate-45 bg-green-600 text-white text-xs px-8 py-1">
                            {plan.tag}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-center mt-8">{plan.title}</h3>
                      <p className="text-3xl font-bold mb-1 text-center">${plan.final_price}/mo</p>
                      <p className="text-gray-500 mb-4 text-center text-sm">(taxes and fees included)</p>

                      <button
                        onClick={() => handleBuyPlan(plan)}
                        className="w-full mt-4 border-2 border-orange-500 text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-500 hover:text-white transition"
                      >
                        Buy Plan
                      </button>

                      <p className="dark:text-gray-400 text-gray-500 text-sm mt-6">{plan.desc}</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {plan.features.map((f: string, i: number) => (
                          <li key={i} className="flex gap-2 dark:text-gray-300 text-gray-600">
                            <span className="text-green-600">✔</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push(getViewAllUrl())}
              className="bg-[#FD4C0E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E63D00]"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* BuyNowModal handles all steps internally (sim pick → compat/contract → checkout) */}
      {showPostpaidModal && selectedPlan && (
        <BuyNowModal
          open={showPostpaidModal}
          onClose={() => setShowPostpaidModal(false)}
          plan={selectedPlan}
        />
      )}

      {showPrepaidModal && selectedPlan && (
        <PrepaidBuyNowModal
          open={showPrepaidModal}
          onClose={() => setShowPrepaidModal(false)}
          plan={selectedPlan}
        />
      )}
    </>
  );
}