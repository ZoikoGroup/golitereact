"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuccessModal from "../components/SuccessModal";
import { Smartphone, FileText, BadgeCheck } from "lucide-react";
import { checkDeviceCompatibility } from "../utils/vcareapi";

export default function ByodPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Device checker states
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckDevice = async () => {
    if (!imei.trim()) {
      setError("Please enter an IMEI or MEID number");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await checkDeviceCompatibility(imei);
      const data = response.data;

      const attCompatibility =
        data?.RESULT?.responseDetails?.inquireDeviceStatusResponse
          ?.deviceStatusDetails?.attCompatibility;

      setResult(data);

      switch (attCompatibility) {
        case "GREEN":
          setShowSuccess(true);
          break;

        case "RED":
          setError(
            "This device is not compatible with GoLite Mobile’s eSIM technology."
          );
          break;

        case "YELLOW":
          setError(
            "Your device compatibility is limited. Please contact support."
          );
          break;

        default:
          setError("Compatibility could not be determined.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      tab: "General",
      q: "What is the GoLite Mobile BYOD program?",
      a: "BYOD allows you to bring your own compatible device and activate it on the GoLite Mobile network.",
    },
    {
      tab: "General",
      q: "Why should I bring my own device to GoLite Mobile?",
      a: "You save money and keep the phone you already love while enjoying GoLite Mobile plans.",
    },
  ];

  return (
    <>
      <Header />

      <div className="w-full bg-white">
        {/* ================= HERO ================= */}
        <section className="bg-[#f6faf4] py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Bring Your Own Device <br />
                <span className="text-orange-500">(BYOD)</span> to{" "}
                <span className="text-orange-600">GoLite Mobile</span>
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Ready to experience seamless connectivity on GoLite Mobile's
                nationwide network? Bringing your own device is easy!
              </p>

              <div className="mt-6 flex gap-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600">
                  Explore Plans
                </button>
                <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-50">
                  Switch and Save Now
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="img/byodBanner.png"
                alt="BYOD GoLite"
                className="max-w-sm"
              />
            </div>
          </div>
        </section>

        {/* ================= COMPATIBILITY CHECKER ================= */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-6">
            <div className="border-2 border-green-400 rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Use Our Compatibility Checker
              </h2>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  placeholder="Enter your IMEI or MEID number"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  className="w-full sm:w-96 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  disabled={loading}
                />
                <button
                  onClick={handleCheckDevice}
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400"
                >
                  {loading ? "Checking..." : "Check My Device"}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 font-semibold">{error}</p>
                </div>
              )}

              {result && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500">
                    View full response
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </section>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Your device is compatible with GoLite Mobile's eSIM technology. You're ready to activate."
      />

      <Footer />
    </>
  );
}
