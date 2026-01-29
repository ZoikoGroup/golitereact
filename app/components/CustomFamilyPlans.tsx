"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

/* ----------------------------------
   TYPES
---------------------------------- */

type Plan = {
  id: number;
  vcPlanID: string;
  slug: string;
  name: "Go-Flex-Family" | "Go-Value-Family" | "Go-Prime-Family";
  duration: string;
  simType: "eSIM" | "pSIM";
  price: number;
};

/* ----------------------------------
   DISCOUNT TABLE
---------------------------------- */

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
  10:{ "Go-Flex-Family": 4, "Go-Value-Family": 12, "Go-Prime-Family": 20 },
};

/* ----------------------------------
   COMPONENT
---------------------------------- */

export default function CustomFamilyPlansComponent() {

  const [familyPlans, setFamilyPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const [primaryKey, setPrimaryKey] = useState<string | null>(null);
  const [additionalLines, setAdditionalLines] = useState(0);
  const [linePlans, setLinePlans] = useState<string[]>([]);

  /* ----------------------------------
     FETCH API
  ---------------------------------- */

  useEffect(() => {
    const fetchFamilyPlans = async () => {
      try {
       
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plans/v1/category/family-plans/`,
          { headers: { Accept: "application/json" } }
        );
        
        const data = await res.json();

        const normalized: Plan[] = data.map((item: any) => ({
          id: item.id,
          vcPlanID: item.vcPlanID,
          slug: item.slug,
          name: item.name,
          duration: `${item.duration_days} Days`,
          simType: item.sim_type === "esim" ? "eSIM" : "pSIM",
          price: Number(item.final_price),
        }));

        setFamilyPlans(normalized);
      } catch (err) {
        console.error("API error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyPlans();
  }, []);

  /* ----------------------------------
     LINE PLAN CONTROL
  ---------------------------------- */

  useEffect(() => {
    setLinePlans((prev) =>
      additionalLines > prev.length
        ? prev.concat(Array(additionalLines - prev.length).fill(""))
        : prev.slice(0, additionalLines)
    );
  }, [additionalLines]);

  const getPlanByKey = (key: string) =>
    familyPlans.find((p) => `${p.name}-${p.simType}` === key) || null;

  /* ----------------------------------
     SUMMARY
  ---------------------------------- */

  /* ----------------------------------
   SUMMARY
---------------------------------- */

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

const handleCheckout = () => {
  if (!summary.primaryPlan) return;

  const existingCart =
    JSON.parse(localStorage.getItem("cart") || "[]");

  const existingDiscounts =
    JSON.parse(localStorage.getItem("discounts") || "[]");

  const newCartItems: any[] = [];
  const newDiscounts: any[] = [];

  /* ============================
      PRIMARY PLAN
  ============================ */

  newCartItems.push({
    planId: summary.primaryPlan.id,
    vcPlanID: summary.primaryPlan.vcPlanID,
    planSlug: summary.primaryPlan.slug,
    planTitle: summary.primaryPlan.name,
    planPrice: summary.primaryPrice,
    planDuration: summary.primaryPlan.duration,
    simType: summary.primaryPlan.simType,
    lineType: "family-primary",
    line: "primary",
    quantity: 1,
  });

  /* ============================
      ADDITIONAL LINES
  ============================ */

  summary.additionalLinesDetails.forEach(
    (item: any, index: number) => {

      const plan = familyPlans.find(
        (p) =>
          p.name === item.name &&
          p.simType === item.simType
      );

      if (!plan) return;

      const lineKey = `line${index + 1}`;

      // Add cart item
      newCartItems.push({
        planId: plan.id,
        vcPlanID: plan.vcPlanID,
        planSlug: plan.slug,
        planTitle: plan.name,
        planPrice: plan.price,
        planDuration: plan.duration,
        simType: plan.simType,
        lineType: "family-additional",
        line: lineKey,
        quantity: 1,
      });

      // Line discount
      if (item.discount > 0) {
        newDiscounts.push({
          type: "family",
          line: lineKey,
          amount: item.discount,
          description: "Family Plan Discount",
        });
      }
    }
  );

  /* ============================
      BUNDLE / SUMMARY DISCOUNT
  ============================ */

  if (summary.discount > 0) {
    newDiscounts.push({
      type: "bundle",
      line: "all",
      amount: summary.discount,
      description: "Family Bundle Discount",
    });
  }

  /* ============================
      REMOVE OLD FAMILY/BUNDLE
  ============================ */

  const filteredDiscounts = existingDiscounts.filter(
    (d: any) => d.type !== "family" && d.type !== "bundle"
  );

  /* ============================
      SAVE STORAGE
  ============================ */

  localStorage.setItem(
    "cart",
    JSON.stringify([...existingCart, ...newCartItems])
  );

  localStorage.setItem(
    "discounts",
    JSON.stringify([...filteredDiscounts, ...newDiscounts])
  );

  window.location.href = "/checkout";
};




  /* ----------------------------------
     UI
  ---------------------------------- */

  return (
    <div className="w-full py-8 px-4">

      {loading && (
        <p className="text-center text-gray-500 py-10">
          Loading family plans...
        </p>
      )}

      {!loading && (
        <>
          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">
              Create Your Family Plan
            </h2>
            <p className="text-gray-600 mt-2">
              Build a custom plan for your family.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 bg-gray-100 p-6 rounded-xl">

              <h3 className="text-xl font-bold mb-4">
                Select Primary Plan
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyPlans.map((p) => {
                  const key = `${p.name}-${p.simType}`;
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setPrimaryKey(key);
                        setAdditionalLines(0);
                      }}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer
                        ${
                          primaryKey === key
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-200 bg-white hover:border-orange-500"
                        }`}
                    >
                      {primaryKey === key && (
                        <Check className="absolute top-3 right-3 bg-white text-orange-500 rounded-full" />
                      )}

                      <h3 className="font-semibold mb-2">
                        {p.name}
                      </h3>

                      <p className="text-sm">
                        Duration: {p.duration}
                      </p>
                      <p className="text-sm">
                        SIM: {p.simType}
                      </p>
                      <p className="text-sm">
                        Price: ${p.price}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* ADDITIONAL LINES */}
              <div className="mt-6">
                <select
                  disabled={!primaryKey}
                  value={additionalLines}
                  onChange={(e) =>
                    setAdditionalLines(Number(e.target.value))
                  }
                  className="w-full p-3 border rounded-lg"
                >
                  <option value={0}>
                    Choose Additional Lines
                  </option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {additionalLines > 0 && (
                <div className="mt-4 space-y-3">
                  {linePlans.map((val, i) => (
                    <select
                      key={i}
                      value={val}
                      onChange={(e) => {
                        const copy = [...linePlans];
                        copy[i] = e.target.value;
                        setLinePlans(copy);
                      }}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select Plan</option>
                      {familyPlans.map((p) => {
                        const key = `${p.name}-${p.simType}`;
                        return (
                          <option key={key} value={key}>
                            {p.name} ({p.simType}) - ${p.price}
                          </option>
                        );
                      })}
                    </select>
                  ))}
                </div>
              )}

            </div>

            {/* RIGHT */}
            <div className="bg-white p-6 rounded-xl border">

              <h3 className="text-xl font-bold mb-4 text-center">
                Your Plan Summary
              </h3>

              {summary.primaryPlan && (
                <div className="mb-4 flex justify-between">
                  <span>
                    {summary.primaryPlan.name}
                  </span>
                  <span>
                    ${summary.primaryPrice.toFixed(2)}
                  </span>
                </div>
              )}

              {summary.additionalLinesDetails.map((l, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{l.name}</span>
                  <span>${l.price.toFixed(2)}</span>
                </div>
              ))}

              {summary.discount > 0 && (
                <div className="flex justify-between text-green-600 mt-2">
                  <span>Discount</span>
                  <span>- ${summary.discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="my-4" />

              <div className="text-center">
                <p>Total Monthly Cost</p>
                <p className="text-4xl font-bold text-orange-500">
                  ${summary.total.toFixed(2)}
                </p>
              </div>

              <button
                disabled={!primaryKey}
                onClick={handleCheckout}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Continue to Checkout
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  );
}
