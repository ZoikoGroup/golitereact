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
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef<any>(null);
  const router = useRouter();

  const router = useRouter();


  /* Responsive slider */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) setSlidesToShow(1);
      else if (width <= 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Fetch plans from API */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plans/v1/`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        const normalized = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          desc: item.short_description,
          price: `$${item.final_price}/mo`,
          category: item.category.slug
            .replace("-plans", "")
            .replace("-", ""),
          simType: item.sim_type === "esim" ? "eSim" : "pSim",
          tag: item.is_popular ? "Most Popular" : null,
          features: item.features.map((f: any) => f.title),
        }));

        setPlans(normalized);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(
    (p) => p.category === activeCategory
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
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

      <h2 className="text-3xl font-bold text-center mb-8">
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
                  ? "bg-white text-[#FD4C0E]"
                  : "text-white"
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
          {["pSim", "eSim"].map((sim) => (
            <button
              key={sim}
              onClick={() => setActiveSimType(sim)}
              className={`px-8 py-2 text-sm font-semibold transition-all ${
                activeSimType === sim
                  ? "text-[#FD4C0E] underline"
                  : "text-gray-600"
              }`}
            >
              {sim}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4 md:px-40 mt-10 relative">
        {loading && (
          <p className="text-center text-gray-500 py-10">
            Loading plans...
          </p>
        )}

        {!loading && filteredPlans.length > 0 && (
          <>
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-[#FD4C0E]" />
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-[#FD4C0E]" />
            </button>

            <Slider ref={sliderRef} {...sliderSettings}>
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="px-12">
                  <div className="relative border p-6 rounded-2xl shadow-sm bg-white min-h-[40vw]">
                    {plan.tag && (
                      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                        <span className="absolute top-7 -right-8 rotate-45 bg-green-600 text-white text-xs px-8 py-1">
                          {plan.tag}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-center mt-8">
                      {plan.title}
                    </h3>

                    <p className="text-3xl font-bold text-center">
                      {plan.price}
                    </p>
                    <p className="text-gray-500 text-sm text-center mb-4">
                      (taxes and fees included)
                    </p>

                    <button className="w-full border-2 border-orange-500 text-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-500 hover:text-white">
                      Buy Plan
                    </button>

                    <p className="text-gray-500 text-sm mt-6">
                      {plan.desc}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      {plan.features.map((f: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-green-600">✔</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}

        {!loading && filteredPlans.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No plans available for this selection.
          </p>
        )}

        <div className="flex justify-center mt-6">

          <button
          onClick={() =>
            router.push(`/${activeCategory}`)
          }
          className="bg-[#FD4C0E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E63D00] w-full sm:w-auto sm:min-w-[200px] transition-all"
        >
          View All
        </button>

        </div>
      </div>
    </div>
  );
}
