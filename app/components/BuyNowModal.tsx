"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkDeviceCompatibility } from "../utils/vcareapi";

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
      : Math.ceil(Number(plan.final_price) * 0.9);

  /* ---------------- ADD TO CART ---------------- */

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

      <div className="bg-white w-[95%] max-w-xl rounded-2xl shadow-xl animate-scaleIn">

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
              {/* 12 MONTH */}
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

                <p className="text-2xl font-bold">
                  ${Number(plan.final_price).toFixed(2)}
                  <span className="text-sm">/mo</span>
                </p>
              </div>

              {/* 24 MONTH */}
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

                <p className="text-2xl font-bold">
                  ${Math.ceil(Number(plan.final_price) * 0.9)}.00
                  <span className="text-sm">/mo</span>
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg"
              >
                Continue
              </button>
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
