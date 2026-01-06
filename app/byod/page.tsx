"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

  const handleCheckDevice = async () => {
    if (!imei.trim()) {
      setError("Please enter an IMEI or MEID number");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const response = await checkDeviceCompatibility(imei);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.message || "Failed to check device compatibility");
    }

    setLoading(false);
  };

  const faqs = [
    {
      tab: "General",
      q: "What is the GoLite Mobile BYOD program?",
      a: "BYOD allows you to bring your own compatible device and activate it on the GoLite Mobile network."
    },
    {
      tab: "General",
      q: "Why should I bring my own device to GoLite Mobile?",
      a: "You save money and keep the phone you already love while enjoying GoLite Mobile plans."
    }
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
                nationwide network? Bringing your own device is easy! Check the
                simple steps below to ensure your phone is compatible and ready
                to go.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                GoLite Mobile utilizes the same network technologies as Verizon,
                AT&T, and T-Mobile. We support GSM and CDMA devices, including 4G
                LTE and 5G phones.
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
                src="img//byodBanner.png"
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

              <p className="mt-2 text-gray-600">
                Enter your IMEI or MEID number. Dial <strong>*#06#</strong> on
                your phone to find it.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="text"
                  placeholder="Enter your IMEI or MEID number"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  className="w-full sm:w-96 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={loading}
                />
                <button
                  onClick={handleCheckDevice}
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Checking..." : "Check My Device"}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 font-semibold">{error}</p>
                </div>
              )}

              {/* Success Result */}
              {result && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-md text-left">
                  <h3 className="text-xl font-bold text-green-800 mb-4">
                    Device Compatibility Result
                  </h3>
                  <div className="space-y-2">
                    {result.compatible !== undefined && (
                      <p className="text-gray-700">
                        <strong>Compatible:</strong>{" "}
                        <span className={result.compatible ? "text-green-600" : "text-red-600"}>
                          {result.compatible ? "Yes ✓" : "No ✗"}
                        </span>
                      </p>
                    )}
                    {result.device_model && (
                      <p className="text-gray-700">
                        <strong>Device Model:</strong> {result.device_model}
                      </p>
                    )}
                    {result.manufacturer && (
                      <p className="text-gray-700">
                        <strong>Manufacturer:</strong> {result.manufacturer}
                      </p>
                    )}
                    {result.message && (
                      <p className="text-gray-700 mt-4">
                        <strong>Message:</strong> {result.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Display full response for debugging */}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      View full response
                    </summary>
                    <pre className="mt-2 p-3 bg-white rounded text-xs overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= ACTIVATION STEPS ================= */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Activating Your Device
            </h2>
            <p className="mt-2 text-gray-600">
              Once you have your GoLite Mobile SIM card and plan, follow these
              steps:
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  label: "Insert SIM in your Mobile",
                },
                {
                  icon: FileText,
                  label: "Complete & Submit Activate SIM Form",
                },
                {
                  icon: BadgeCheck,
                  label: "Enjoy GoLite Mobile",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center relative"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon className="w-9 h-9 text-white" strokeWidth={2} />
                    </div>

                    {i !== 2 && (
                      <span className="hidden md:block absolute top-10 right-[-48%] w-[87%] border-t-2 border-dashed border-green-500" />
                    )}

                    <p className="mt-4 font-semibold text-gray-700 max-w-xs">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <a
              href="#"
              className="inline-block mt-6 text-green-600 font-semibold underline"
            >
              Click here
            </a>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="py-16 bg-[#fff5f2]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["General", "Device Compatibility", "Activation & Setup", "Service"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full border font-semibold ${
                    activeTab === tab
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-orange-300 text-orange-500 hover:bg-orange-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {faqs
                .filter(f => f.tab === activeTab)
                .map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex justify-between items-center px-6 py-4 font-semibold text-gray-800"
                    >
                      {faq.q}
                      <span className="text-xl">
                        {openFaq === i ? "-" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}