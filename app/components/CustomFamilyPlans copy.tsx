"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";


export default function CustomFamilyPlansComponent() {
    
/* TYPES */
type Plan = {
  name: "Go-Flex-Family" | "Go-Value-Family" | "Go-Prime-Family";
  duration: string;
  simType: "eSIM" | "pSIM";
  price: number;
};
/* DATA */
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

const FamilyPlans: Plan[] = [
  { name: "Go-Flex-Family", duration: "30 Days", simType: "eSIM", price: 18 },
  { name: "Go-Value-Family", duration: "30 Days", simType: "eSIM", price: 39 },
  { name: "Go-Prime-Family", duration: "30 Days", simType: "eSIM", price: 59 },
  { name: "Go-Flex-Family", duration: "30 Days", simType: "pSIM", price: 18 },
  { name: "Go-Value-Family", duration: "30 Days", simType: "pSIM", price: 39 },
  { name: "Go-Prime-Family", duration: "30 Days", simType: "pSIM", price: 59 },
];
  /* ✅ HOOKS INSIDE COMPONENT */
  const [primaryKey, setPrimaryKey] = useState<string | null>(null);
  const [additionalLines, setAdditionalLines] = useState(0);
  const [linePlans, setLinePlans] = useState<string[]>([]);

  useEffect(() => {
    setLinePlans((prev) =>
      additionalLines > prev.length
        ? prev.concat(Array(additionalLines - prev.length).fill(""))
        : prev.slice(0, additionalLines)
    );
  }, [additionalLines]);

  const getPlanByKey = (key: string) =>
    FamilyPlans.find((p) => `${p.name}-${p.simType}` === key) || null;

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

  /* ✅ JSX RETURN */
  return (
    <div className="w-full py-8 px-4">
      {/* Custom PLAN SELECTION SECTION */}
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
  
{/* END Custom PLAN SELECTION SECTION */}
    </div>
  );
}
