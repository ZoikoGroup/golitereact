"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle, Check, Star, Smartphone, CreditCard, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkDeviceCompatibility } from "../utils/vcareapi";

interface BuyNowModalProps {
  open: boolean;
  onClose: () => void;
  plan: any;
  simType:any;
}

const PROTECTION_PRICES = { smartphone: 8.99, tablet: 8.99, smartwatch: 5.99 };

export default function BuyNowModal({ open, onClose, plan }: BuyNowModalProps) {
  const router = useRouter();

  const [step, setStep] = useState<"sim" | "imei" | "contract">("sim");

  // Step 1
  const [simType, setSimType] = useState<"eSim" | "pSim" | null>(null);
  const [protectionOpen, setProtectionOpen] = useState(false);
  const [protection, setProtection] = useState({ smartphone: false, tablet: false, smartwatch: false });

  // Step 2 — IMEI (eSIM only)
  const [imei, setImei] = useState("");
  const [imeiLoading, setImeiLoading] = useState(false);
  const [imeiError, setImeiError] = useState("");
  const [imeiSuccess, setImeiSuccess] = useState("");

  // Step 3 — Contract
  const [duration, setDuration] = useState<12 | 24>(24);

  if (!open) return null;

  const protectionTotal = Object.entries(protection)
    .filter(([, v]) => v)
    .reduce((sum, [k]) => sum + PROTECTION_PRICES[k as keyof typeof PROTECTION_PRICES], 0);

  const price = duration === 12 ? Number(plan.final_price) : Number(plan.price_24 ?? plan.final_price);
  const annualSavings = (Number(plan.final_price) - Number(plan.price_24 ?? plan.final_price)) * 12;

  const totalSteps = simType === "eSim" ? 3 : 2;
  const currentStep = step === "sim" ? 1 : step === "imei" ? 2 : simType === "eSim" ? 3 : 2;

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
      deviceProtection: protection,
      protectionTotal,
    };
    const existing = JSON.parse(localStorage.getItem("cart") || "[]") || [];
    localStorage.setItem("cart", JSON.stringify([...existing, cartItem]));
    router.push("/checkout");
  };

  const handleSimContinue = () => {
    if (!simType) return;
    if (simType === "eSim") setStep("imei");
    else setStep("contract");
  };

  const handleBack = () => {
    if (step === "imei") setStep("sim");
    if (step === "contract") setStep(simType === "eSim" ? "imei" : "sim");
  };

  const handleCheckEsim = async () => {
    if (!imei) { setImeiError("IMEI or MEID is required"); return; }
    if (!/^\d+$/.test(imei)) { setImeiError("Only numbers are allowed"); return; }
    if (imei.length < 14) { setImeiError("IMEI must be at least 14 digits"); return; }

    setImeiLoading(true);
    setImeiError("");
    setImeiSuccess("");

    try {
      const response = await checkDeviceCompatibility(imei);
      const attCompatibility =
        response?.data?.data?.RESULT?.responseDetails
          ?.inquireDeviceStatusResponse?.deviceStatusDetails?.attCompatibility;

      if (attCompatibility === "GREEN") {
        setImeiSuccess("✅ Device is compatible! You can now continue.");
      } else {
        setImeiError("❌ This device is not compatible with GoLite Mobile eSIM.");
      }
    } catch {
      setImeiError("Something went wrong. Please try again.");
    } finally {
      setImeiLoading(false);
    }
  };

  const stepTitle: Record<string, string> = {
    sim: "Get Started with Your Plan",
    imei: "Check Device Compatibility",
    contract: "Choose Your Contract",
  };
  const stepSubtitle: Record<string, string> = {
    sim: "Choose how you'd like to set up your new mobile service",
    imei: "Enter your IMEI to confirm your device supports eSIM",
    contract: "Pick a 12 or 24 month plan and enjoy premium savings",
  };

  return (
    <>
      <style>{`
        .bnm-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 1rem; animation: bnmFade 0.2s ease;
        }
        @keyframes bnmFade { from{opacity:0} to{opacity:1} }
        .bnm-card {
          background: white; border-radius: 1.25rem; width: 100%; max-width: 480px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2); animation: bnmUp 0.22s ease;
          max-height: 90vh; display: flex; flex-direction: column; overflow: hidden;
        }
        @keyframes bnmUp {
          from { transform: translateY(22px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .bnm-sim-opt {
          border: 2px solid #e5e7eb; border-radius: 0.875rem;
          padding: 0.9rem 1rem; cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          display: flex; align-items: flex-start; gap: 0.75rem;
        }
        .bnm-sim-opt:hover { border-color: #FD4C0E; background: #fff8f6; }
        .bnm-sim-opt.active { border-color: #FD4C0E; background: #fff8f6; }
        .bnm-radio {
          width: 1.1rem; height: 1.1rem; border-radius: 50%;
          border: 2px solid #d1d5db; flex-shrink: 0; margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s;
        }
        .bnm-radio.active { border-color: #FD4C0E; }
        .bnm-badge {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-size: 0.7rem; font-weight: 500;
          padding: 0.2rem 0.65rem; border-radius: 9999px; margin-top: 0.35rem;
        }
        .bnm-badge-yellow { background: #fefce8; color: #854d0e; border: 1px solid #fde047; }
        .bnm-badge-orange { background: #fff7ed; color: #9a3412; border: 1px solid #fdba74; }
        .bnm-prot-header {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.8rem 1rem; background: #FD4C0E; cursor: pointer; user-select: none;
        }
        .bnm-prot-body {
          background: #fff5f2; border: 1.5px solid #FD4C0E;
          border-top: none; border-radius: 0 0 0.875rem 0.875rem;
        }
        .bnm-toggle-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.7rem 1.1rem; border-bottom: 1px solid #ffe4d9;
        }
        .bnm-toggle-row:last-child { border-bottom: none; }
        .bnm-toggle-row.on { background: #fff0eb; border: 1.5px solid #FD4C0E; border-radius: 0.5rem; margin: 0.25rem 0.6rem; }
        .bnm-toggle {
          position: relative; width: 2.6rem; height: 1.4rem;
          border-radius: 9999px; cursor: pointer; transition: background 0.2s; flex-shrink: 0;
        }
        .bnm-toggle.on  { background: #FD4C0E; }
        .bnm-toggle.off { background: #d1d5db; }
        .bnm-toggle-thumb {
          position: absolute; top: 2px; width: 1.1rem; height: 1.1rem;
          background: white; border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: left 0.2s;
        }
        .bnm-toggle.on  .bnm-toggle-thumb { left: calc(100% - 1.2rem); }
        .bnm-toggle.off .bnm-toggle-thumb { left: 2px; }
      `}</style>

      <div className="bnm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="bnm-card">

          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-3">
              {Array.from({ length: totalSteps }).map((_, i) => {
                const n = i + 1;
                const done = n < currentStep;
                const active = n === currentStep;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${active ? "bg-[#FD4C0E] text-white" : done ? "bg-orange-200 text-orange-700" : "bg-gray-800 text-white"}`}>
                      {done ? <Check size={12} /> : n}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`h-0.5 w-10 rounded ${done ? "bg-[#FD4C0E]" : "bg-gray-300"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">{stepTitle[step]}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{stepSubtitle[step]}</p>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition ml-3 flex-shrink-0">
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">

            {/* STEP 1: SIM + Protection */}
            {step === "sim" && (
              <>
                <div className={`bnm-sim-opt ${simType === "eSim" ? "active" : ""}`} onClick={() => setSimType("eSim")}>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Smartphone size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">eSIM</p>
                    <p className="text-xs text-gray-400">Digital SIM built into your phone – no physical card needed</p>
                    <p className="text-xs text-gray-400">Instant activation | No waiting for delivery</p>
                    <span className="bnm-badge bnm-badge-yellow">⚠️ Click here to check Device Compatibility</span>
                  </div>
                  <div className={`bnm-radio ${simType === "eSim" ? "active" : ""}`}>
                    {simType === "eSim" && <div className="w-2 h-2 rounded-full bg-[#FD4C0E]" />}
                  </div>
                </div>

                <div className={`bnm-sim-opt ${simType === "pSim" ? "active" : ""}`} onClick={() => setSimType("pSim")}>
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CreditCard size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">Physical SIM</p>
                    <p className="text-xs text-gray-400">Traditional SIM card that you insert into your phone</p>
                    <p className="text-xs text-gray-400">Works with all phones | Familiar and reliable</p>
                    <span className="bnm-badge bnm-badge-orange">📦 Delivery charges apply. 2–3 business days</span>
                  </div>
                  <div className={`bnm-radio ${simType === "pSim" ? "active" : ""}`}>
                    {simType === "pSim" && <div className="w-2 h-2 rounded-full bg-[#FD4C0E]" />}
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#FD4C0E]">
                  <div className="bnm-prot-header" onClick={() => setProtectionOpen((v) => !v)}>
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Shield size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm leading-none">Add Device Protection</p>
                      <p className="text-orange-100 text-xs mt-0.5">Protect your devices from just $5.99/mo</p>
                    </div>
                    <span className="text-xs font-bold bg-white text-[#FD4C0E] px-2.5 py-1 rounded-full mr-2 flex-shrink-0">ADD-ON</span>
                    {protectionOpen ? <ChevronUp size={17} className="text-white flex-shrink-0" /> : <ChevronDown size={17} className="text-white flex-shrink-0" />}
                  </div>
                  {protectionOpen && (
                    <div className="bnm-prot-body">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-orange-100">
                        <p className="text-xs text-gray-600">Select devices to protect — coverage starts on activation</p>
                        {protectionTotal > 0 && (
                          <span className="text-xs font-semibold text-[#FD4C0E] whitespace-nowrap ml-2">+${protectionTotal.toFixed(2)}/mo added</span>
                        )}
                      </div>
                      {([
                        { key: "smartphone", label: "Smart Phone Protection", price: 8.99 },
                        { key: "tablet",     label: "Tablet Protection",       price: 8.99 },
                        { key: "smartwatch", label: "Smart Watch Protection",  price: 5.99 },
                      ] as { key: keyof typeof protection; label: string; price: number }[]).map(({ key, label, price: p }) => (
                        <div key={key} className={`bnm-toggle-row ${protection[key] ? "on" : ""}`}>
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-wide ${protection[key] ? "text-[#FD4C0E]" : "text-gray-700"}`}>{label}</p>
                            <p className="text-xs text-gray-500">${p.toFixed(2)}/month per device</p>
                          </div>
                          <button
                            className={`bnm-toggle ${protection[key] ? "on" : "off"}`}
                            onClick={() => setProtection((prev) => ({ ...prev, [key]: !prev[key] }))}
                          >
                            <div className="bnm-toggle-thumb" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* STEP 2: IMEI (eSIM only) */}
            {step === "imei" && (
              <>
                <p className="text-sm text-gray-600">
                  To activate your eSIM we need to verify your device supports it. Dial{" "}
                  <span className="font-mono font-semibold">*#06#</span> to find your IMEI.
                </p>
                <input
                  type="text"
                  value={imei}
                  onChange={(e) => { setImei(e.target.value.replace(/\D/g, "")); setImeiError(""); setImeiSuccess(""); }}
                  placeholder="Enter your IMEI (14–15 digits)"
                  maxLength={15}
                  className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-xl p-3 text-sm outline-none transition"
                />
                {imeiError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <AlertCircle size={15} /> {imeiError}
                  </div>
                )}
                {imeiSuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle size={15} /> {imeiSuccess}
                  </div>
                )}
              </>
            )}

            {/* STEP 3: Contract */}
            {step === "contract" && (
              <>
                {protectionTotal > 0 && (
                  <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-orange-700">Device Protection Added</p>
                      <p className="text-xs text-orange-500 mt-0.5">
                        {(Object.keys(protection) as (keyof typeof protection)[])
                          .filter((k) => protection[k])
                          .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
                          .join(", ")}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-orange-600">+${protectionTotal.toFixed(2)}/mo</span>
                  </div>
                )}

                <div
                  onClick={() => setDuration(12)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition relative ${duration === 12 ? "border-orange-500 shadow-lg" : "border-gray-300"}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">12 Month <span className="text-gray-400 text-sm font-normal">Contract</span></p>
                    <p className="text-3xl font-bold">${Number(plan.final_price).toFixed(2)}<span className="text-base font-normal text-gray-500">/mo</span></p>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check size={15} className="text-green-500" /> Standard plan benefits
                  </div>
                </div>

                <div
                  onClick={() => setDuration(24)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition relative mt-5 ${duration === 24 ? "border-orange-500 shadow-lg" : "border-gray-300"}`}
                >
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap ${duration === 24 ? "bg-orange-500" : "bg-gray-400"}`}>
                    <Star size={12} fill="white" />
                    SAVE ${annualSavings.toFixed(2)} (ANNUALLY) vs 12-month
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <p className="text-xl font-bold">24 Month <span className="text-gray-400 font-normal text-sm">Contract</span></p>
                    <p className="text-3xl font-bold">${Number(plan.price_24 ?? plan.final_price).toFixed(2)}<span className="text-base font-normal text-gray-500">/mo</span></p>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-gray-600 text-sm">
                    {["All standard plan benefits", "Taxes and fees included", "Priority customer support"].map((t) => (
                      <div key={t} className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" /> {t}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-3">
            <button
              onClick={step === "sim" ? onClose : handleBack}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition text-sm"
            >
              {step === "sim" ? "Cancel" : "Back"}
            </button>

            {/* Step 1 — Continue */}
            {step === "sim" && (
              <button
                onClick={handleSimContinue}
                disabled={!simType}
                className={`flex-1 font-semibold py-2.5 rounded-xl transition text-sm text-white ${simType ? "bg-[#FD4C0E] hover:bg-[#e63d00]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                Continue
              </button>
            )}

            {/* Step 2 — Check button always active; after success show Continue to Checkout */}
            {step === "imei" && (
              imeiSuccess ? (
                <button
                  onClick={() => setStep("contract")}
                  className="flex-1 bg-[#FD4C0E] hover:bg-[#e63d00] text-white font-semibold py-2.5 rounded-xl transition text-sm"
                >
                  Continue to Checkout →
                </button>
              ) : (
                <button
                  onClick={handleCheckEsim}
                  disabled={imeiLoading}
                  className="flex-1 bg-[#FD4C0E] hover:bg-[#e63d00] text-white font-semibold py-2.5 rounded-xl transition text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {imeiLoading ? "Checking..." : "Check Compatibility"}
                </button>
              )
            )}

            {/* Step 3 — Checkout */}
            {step === "contract" && (
              <button
                onClick={addToCartAndCheckout}
                className="flex-1 bg-[#FD4C0E] hover:bg-[#e63d00] text-white font-semibold py-2.5 rounded-xl transition text-sm"
              >
                Continue with {duration} Month Plan →
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}