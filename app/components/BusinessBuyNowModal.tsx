"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkDeviceCompatibility } from "../utils/vcareapi";

export default function PrepaidBuyNowModal({
  open,
  onClose,
  plan,
  simType,
}: any) {

  const router = useRouter();

  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  if (!open) return null;

  /* ---------------- ADD TO CART ---------------- */

  const goCheckout = () => {
  const item = {
    planId: plan.id,
    vcPlanID: plan.vcPlanID || null,
    planSlug: plan.slug || "",
    planTitle: plan.name || plan.title,
    planPrice: Number(plan.final_price),
    planDuration: plan.duration_days || "",
    simType,
    imei: simType === "eSim" ? imei : null,
    lineType: "prepaid",
    quantity: 1,
  };

  const cart =
    JSON.parse(localStorage.getItem("cart") || "[]") || [];

  localStorage.setItem("cart", JSON.stringify([...cart, item]));
  router.push("/checkout");
};


  /* ---------------- CHECK ESIM ---------------- */

  const handleCheck = async () => {
    if (!imei) {
      setStatus("error");
      setMessage("IMEI is required");
      return;
    }

    if (imei.length < 14) {
      setStatus("error");
      setMessage("IMEI must be at least 14 digits");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await checkDeviceCompatibility(imei);

      const att =
        res?.data?.data?.RESULT?.responseDetails
          ?.inquireDeviceStatusResponse
          ?.deviceStatusDetails?.attCompatibility;

      if (att === "GREEN") {
        setStatus("success");
        setMessage(
          "Great! Your device is compatible with GoLite eSim."
        );
      } else {
        setStatus("error");
        setMessage("This device is not eSim compatible.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 dark:bg-gray-900 bg-black/60 z-[999] flex items-center justify-center">

      <div className=" dark:bg-gray-800 bg-white w-[95%] max-w-lg rounded-xl shadow-xl animate-scaleIn">

        {/* HEADER */}
        <div className="p-6 border-b text-center relative">
          <h2 className="text-2xl font-bold dark:text-white">
            {simType === "pSim"
              ? "You've Selected Physical SIM"
              : "Great! You've Selected Your eSIM — Instant Setup, No Waiting."}
          </h2>

          <button
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5 text-center">

          {/* pSim */}
          {simType === "pSim" && (
            <>
              <p className="dark:text-gray-300 text-gray-600">
                Simple, reliable, yours to keep.
              </p>

              <button
                onClick={goCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                Continue to Checkout
              </button>
            </>
          )}

          {/* eSim */}
          {simType === "eSim" && (
            <>
              <input
                value={imei}
                onChange={(e) =>
                  setImei(e.target.value.replace(/\D/g, ""))
                }
                maxLength={15}
                placeholder="Enter your IMEI"
                className="w-full border p-3 rounded-lg"
              />

              <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Checking..." : "Check Compatibility"}
              </button>

              {status === "success" && (
                <div className="bg-green-50 text-green-600 p-3 rounded">
                  {message}

                  <button
                    onClick={goCheckout}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
                  >
                    Continue to Checkout
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className=" dark:bg-red-900/10 bg-red-50 text-red-600 p-3 rounded">
                  {message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
