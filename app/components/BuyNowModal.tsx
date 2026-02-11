"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkDeviceCompatibility } from "../utils/vcareapi";
import { Check, Star } from "lucide-react";
interface BuyNowModalProps {
  open: boolean;
  onClose: () => void;
  plan: any;
  simType: "eSim" | "pSim";
}

export default function BuyNowModal({
  open,
  onClose,
  plan,
  simType,
}: BuyNowModalProps) {
  const router = useRouter();

  const [duration, setDuration] = useState<12 | 24>(24);
  const [step, setStep] = useState<"contract" | "imei">("contract");

  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  /* ---------------- PRICE ---------------- */

  const price =
    duration === 12
      ? Number(plan.final_price)
      : Number(plan.price_24);

  /* ---------------- ADD TO CART ---------------- */
  const annualSavings =  (Number(plan.final_price) - Number(plan.price_24)) * 12 ;
  const addToCartAndCheckout = () => {
    const cartItem = {
      planId: plan.id,
      vcPlanID: plan.vcPlanID,
      planSlug: plan.slug,
      planTitle: plan.name || plan.title,
      planPrice: price,
      planDuration: `${duration} months`,
      simType,
      imei: simType === "eSim" ? imei : null,
      lineType: "postpaid",
      quantity: 1,
    };

    const existing =
      JSON.parse(localStorage.getItem("cart") || "[]") || [];

    localStorage.setItem(
      "cart",
      JSON.stringify([...existing, cartItem])
    );

    router.push("/checkout");
  };

  /* ---------------- CONTINUE ---------------- */

  const handleContinue = () => {
    if (simType === "eSim") {
      setStep("imei");
    } else {
      addToCartAndCheckout();
    }
  };

  /* ---------------- CHECK ESIM DEVICE ---------------- */

  const handleCheckEsim = async () => {
    if (!imei) {
      setError("IMEI or MEID is required");
      return;
    }

    if (!/^\d+$/.test(imei)) {
      setError("Only numbers are allowed");
      return;
    }

    if (imei.length < 14) {
      setError("IMEI must be at least 14 digits");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await checkDeviceCompatibility(imei);

      const attCompatibility =
        response?.data?.data?.RESULT?.responseDetails
          ?.inquireDeviceStatusResponse
          ?.deviceStatusDetails?.attCompatibility;

      if (attCompatibility === "GREEN") {
        setSuccess("✅ Device is compatible! Redirecting...");

        setTimeout(() => {
          addToCartAndCheckout();
        }, 1200);
      } else {
        setError(
          "❌ This device is not compatible with GoLite Mobile eSIM."
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">

      <div className="bg-white w-[50%]  rounded-2xl shadow-xl animate-scaleIn">

        {/* HEADER */}
        <div className="relative p-6 border-b text-center">
          <h2 className="text-2xl font-bold">
            {step === "contract"
              ? "Choose Your Contract Length"
              : "Great! You've Selected Your eSIM — Instant Setup, No Waiting."}
          </h2>

          <p className="text-gray-500 mt-2">
            {step === "contract"
              ? "Select 12 or 24 month plan"
              : "Enter your device IMEI for eSIM activation"}
          </p>

          <button
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* CONTRACT STEP */}
          {step === "contract" && (
            <>
            {/* CONTRACT OPTIONS */}
              <div className="space-y-5">

                {/* 12 MONTH */}
                <div
                  onClick={() => setDuration(12)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition relative
                  ${duration === 12 ? "border-orange-500 shadow-lg" : "border-gray-300"}
                  `}
                >
                  <div className="">
                    <div className="flex justify-between items-start">
                      <p className="text-2xl font-bold">
                        12 Month <span className="text-gray-400 text-sm font-normal">Contract</span>
                      </p>
                      <div className="text-right">
                        <p className="text-4xl font-bold">
                          ${Number(plan.final_price).toFixed(2)}
                          <span className="text-lg font-normal text-gray-500">/mo</span>
                        </p>
                      </div>
                      </div>
                      <div>
                      <hr className="my-3 border-gray-300" />
                      <div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-3">
                          <Check size={16} className="text-green-500" />
                          Standard plan benefits
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>

                {/* 24 MONTH */}
                <div
                  onClick={() => setDuration(24)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition relative
                  ${
                    duration === 24
                      ? "border-orange-500 shadow-lg"
                      : "border-gray-300"
                  }
                  `}
                >
                  {/* Savings Badge */}
                  <div className={`absolute -top-3 text-xs font-semibold left-1/2 -translate-x-1/2  text-white px-4 py-1.5 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap 
                    ${
                    duration === 24
                      ? "border-orange-500 shadow-lg bg-orange-500"
                      : "border-gray-300 bg-gray-500"
                  }
                    
                    `}>
                    <Star size={14} fill="white" />
                    SAVE ${annualSavings.toFixed(2)}(ANNUALLY) vs 12-month
                  </div>

                  <div>
                    <div className="flex justify-between items-start mt-2">
                      <p className="text-2xl font-bold">
                        24 Month <span className="text-gray-400 font-normal text-sm">Contract</span>
                      </p>
                      <div className="text-right">
                        <p className="text-4xl font-bold">
                          ${Number(plan.price_24 ?? plan.final_price).toFixed(2)}
                          <span className="text-lg font-normal text-gray-500">/mo</span>
                        </p>
                      </div>
                    </div>
                    <hr className="my-3 border-gray-300" />
                    <div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm mt-3">

                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          All standard plan benefits
                        </div>

                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          Taxes and fees included
                        </div>

                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          Priority customer support
                        </div>

                      </div>
                      
                    </div>

                    
                  </div>
                </div>

                {/* CONTINUE BUTTON */}
                <button
                  onClick={handleContinue}
                  className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-2"
                >
                  Continue with {duration} Month Plan →
                </button>

              </div>

            </>
          )}

          {/* IMEI STEP */}
          {step === "imei" && (
            <>
              <input
                type="text"
                value={imei}
                onChange={(e) =>
                  setImei(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter your IMEI"
                maxLength={15}
                className="w-full border p-3 rounded-lg focus:border-orange-500 outline-none"
              />

              {/* ERROR MESSAGE */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle size={18} />
                  {success}
                </div>
              )}

              <button
                onClick={handleCheckEsim}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg disabled:bg-gray-400"
              >
                {loading ? "Checking..." : "Confirm & Continue"}
              </button>
            </>
          )}

        </div>
      </div>

      {/* ANIMATION */}
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
