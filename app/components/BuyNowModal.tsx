"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface BuyNowModalProps {
  open: boolean;
  onClose: () => void;
  plan: any;
  simType: "eSIM" | "pSIM"; // coming from previous page
}

export default function BuyNowModal({
  open,
  onClose,
  plan,
  simType,
}: BuyNowModalProps) {
  const router = useRouter();

  const [duration, setDuration] = useState<12 | 24>(24);

  if (!open) return null;

  // Price rule
  const price =
    duration === 12
      ? Number(plan.final_price)
      : Number(plan.final_price) - 5;

  // Add To Cart
  const handleBuyNow = () => {
    const cartItem = {
      planId: plan.id,
      vcPlanID: plan.vcPlanID,
      planSlug: plan.slug,
      planTitle: plan.title,
      planPrice: price,
      planDuration: `${duration} months`,
      simType, // from previous page
      lineType: plan.category?.slug || "postpaid",
      formData: {
        priceQty: 1,
      },
    };

    const existing =
      JSON.parse(localStorage.getItem("cart") || "[]") || [];

    localStorage.setItem(
      "cart",
      JSON.stringify([...existing, cartItem])
    );

    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">

      {/* Modal */}
      <div className="bg-white w-[95%] max-w-xl rounded-2xl shadow-xl animate-scaleIn">

        {/* Header */}
        <div className="relative p-6 border-b text-center">
          <h2 className="text-2xl font-bold">
            You Choose Your Physical SIM — Reliable, Flexible & Familiar
          </h2>

          <p className="text-gray-500 mt-2">
            Now choose your ideal 12 or 24 month plan and enjoy premium savings
          </p>

          <button
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* CONTRACT OPTIONS */}

          Show all selected data in JSON format
<pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
  {JSON.stringify({ ...plan, duration, simType }, null, 2)}
</pre>


          {/* 12 Month */}
          <div
            onClick={() => setDuration(12)}
            className={`flex justify-between items-center p-5 rounded-xl border cursor-pointer
            ${
              duration === 12
                ? "border-orange-500"
                : "border-gray-300"
            }`}
          >
            <p className="font-semibold">12 Month Contract</p>

            <div className="text-right">
              <p className="text-2xl font-bold">
                ${Number(plan.final_price).toFixed(2)}
                <span className="text-sm font-normal">/mo</span>
              </p>
              <p className="text-xs text-gray-500">
                (taxes and fees included)
              </p>
            </div>
          </div>

          {/* 24 Month */}
          <div
            onClick={() => setDuration(24)}
            className={`flex justify-between items-center p-5 rounded-xl border cursor-pointer
            ${
              duration === 24
                ? "border-orange-500"
                : "border-gray-300"
            }`}
          >
            <p className="font-semibold">24 Month Contract</p>

            <div className="text-right">
              <p className="text-2xl font-bold">
                ${(Number(plan.final_price) - 5).toFixed(2)}
                <span className="text-sm font-normal">/mo</span>
              </p>
              <p className="text-xs text-gray-500">
                (taxes and fees included)
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Continue {duration} Month Plan
          </button>

        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}
