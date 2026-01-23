"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuccessModal from "../components/SuccessModal";
import { Smartphone, FileText, ShieldCheck, Plus, Minus } from "lucide-react";
import { checkDeviceCompatibility } from "../utils/vcareapi";



export default function ByodPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [inputError, setInputError] = useState("");

  // Device checker states
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckDevice = async () => {
  // ❌ Empty
  if (!imei) {
    setInputError("IMEI or MEID is required");
    return;
  }

  // ❌ Not numeric (extra safety)
  if (!/^\d+$/.test(imei)) {
    setInputError("Only numbers are allowed");
    return;
  }

  // ❌ Less than 14 digits
  if (imei.length < 14) {
    setInputError("IMEI or MEID must be at least 14 digits");
    return;
  }

  setLoading(true);
  setInputError("");

  try {
    const response = await checkDeviceCompatibility(imei);
    const data = response.data;

    const attCompatibility =
      data?.data?.RESULT?.responseDetails?.inquireDeviceStatusResponse
        ?.deviceStatusDetails?.attCompatibility;

    if (attCompatibility === "GREEN") {
      setModalType("success");
      setModalMessage(
        "Your device is compatible with GoLite Mobile's eSIM technology. You're ready to activate."
      );
    } else {
      setModalType("error");
      setModalMessage(
        "This device is not compatible with GoLite Mobile’s eSIM technology."
      );
    }

    setModalOpen(true);
  } catch {
    setModalType("error");
    setModalMessage("Something went wrong. Please try again.");
    setModalOpen(true);
  } finally {
    setLoading(false);
  }
};
const steps = [
    {
      icon: Smartphone,
      title: "Insert SIM in your Mobile",
    },
    {
      icon: FileText,
      title: "Complete & Submit\nActivate SIM Form",
    },
    {
      icon: ShieldCheck,
      title: "Enjoy GoLite Mobile",
    },
  ];

  const [activeTab, setActiveTab] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  

  const TABS = ["General", "Device Compatibility", "Activation & Setup", "Service"];

const FAQS = [
  {
    tab: "Device Compatibility",
    q: "What is the GoLite Mobile BYOD program?",
    a: "BYOD allows you to bring your own compatible device and activate it on the GoLite Mobile network.",
  },
  {
    tab: "Device Compatibility",
    q: "Why should I bring my own device to GoLite Mobile?",
    a: "You save money and keep the phone you already love while enjoying GoLite Mobile plans.",
  },
  {
    tab: "Device Compatibility",
    q: "What is the GoLite Mobile BYOD program?",
    a: "BYOD allows you to bring your own compatible device and activate it on the GoLite Mobile network.",
  },
  {
    tab: "Device Compatibility",
    q: "Why should I bring my own device to GoLite Mobile?",
    a: "You save money and keep the phone you already love while enjoying GoLite Mobile plans.",
  },
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
const filteredFaqs = FAQS.filter((f) => f.tab === activeTab);
  return (
    <>
    <style jsx global>{`
    @keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scaleIn {
  animation: scaleIn 0.2s ease-out;
}
`}</style>
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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // only numbers
                    setImei(value);
                    setInputError("");
                  }}
                  maxLength={15}
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
                  {inputError && (
                    <p className="flex flex-col sm:flex-row gap-4 justify-center text-center text-red-600 font-semibold">
                      {inputError}
                    </p>
                  )}

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
        <section className="py-4 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900">
          Activating Your Device
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Once you have your GoLite Mobile SIM card and have chosen a plan,
          follow these simple steps to activate your device:
        </p>

        {/* Steps */}
        <div className="mt-12 grid md:grid-cols-3 gap-10 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center relative"
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <Icon className="w-9 h-9 text-white" strokeWidth={2} />
                </div>

                {/* Dashed line */}
                {index !== steps.length - 1 && (
                  <span className="hidden md:block absolute top-10 right-[-50%] w-full border-t-2 border-dashed border-green-500" />
                )}

                {/* Text */}
                <p className="mt-4 font-semibold text-gray-700 whitespace-pre-line">
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="inline-block mt-8 text-green-600 font-semibold underline hover:text-green-700"
        >
          Click here
        </a>
      </div>
    </section>

<section className="bg-[#fff5f2] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Frequently Asked Questions
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(null);
              }}
              className={`px-6 py-2 rounded-full font-semibold border transition ${
                activeTab === tab
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-400 text-orange-500 hover:bg-orange-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 items-start">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.q}
                  </span>

                  <span className="text-orange-500">
                    {isOpen ? <Minus /> : <Plus />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>


      </div>

      <SuccessModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  message={modalMessage}
  type={modalType}
/>


      <Footer />
    </>
  );
}
                        
