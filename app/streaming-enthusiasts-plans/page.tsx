"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StreamingSlider from "../components/StreamingSlider";
import StreamingPlanSlider from "../components/StreamingPlanSlider";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
export default function StreamingPlans() {


  const faqs = [
  {
    question: "What is GoLite Mobile?",
    answer:
      "GoLite Mobile is a premium MVNO (Mobile Virtual Network Operator) offering high-quality prepaid and postpaid mobile plans with nationwide coverage. We focus on providing high-speed data, affordable pricing, and eco-conscious initiatives."
  },

  {
    question: "Does GoLite Mobile support 5G?",
    answer:
      "Yes, all our plans include 5G access at no extra cost, provided your device supports 5G."
  },

  {
    question: "What network does GoLite Mobile use?",
    answer:
      "GoLite Mobile operates on one of the largest and most reliable nationwide networks, ensuring high-speed connectivity and coverage across the U.S."
  },

  {
    question: "Do your plans include mobile hotspot data?",
    answer:
      "Yes! All our plans include mobile hotspot data. The amount of hotspot data varies by plan, with up to 15 GB available on the Go-Unlimited Plan."
  },

  {
    question: "What is Data Rollover, and how does it work?",
    answer:
      "Data Rollover allows you to carry over unused data into the next billing cycle. The Go-Prime Plan rolls over all unused data, while the Go-Value Plan allows up to 1 GB of data to roll over."
  },

  {
    question: "Are there restrictions on unlimited data plans?",
    answer:
      "While our Go-Unlimited Plan provides unlimited high-speed data, customers who use excessive amounts of data may experience deprioritization during peak network times."
  },
  {
    question: "How does billing work for GoLite Mobile plans?",
    answer:
      "Our service operates on a simple monthly billing cycle with no contracts. You pay upfront for prepaid plans, and postpaid plans are billed at the end of the cycle."
  },

  {
    question: "Are there any hidden fees or activation charges?",
    answer:
      "No! GoLite Mobile is transparent - what you see is what you pay. There are no activation fees or hidden charges."
  },

  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can switch between plans anytime through your GoLite Mobile account. Changes take effect at the start of your next billing cycle."
  },

  {
    question: "Can I bring my own phone to GoLite Mobile?",
    answer:
      "Absolutely! GoLite Mobile supports most unlocked GSM-compatible devices, including iPhones, Samsung, Google Pixel, and more."
  },

  {
    question: "How do I activate my GoLite Mobile SIM card?",
    answer:
      "Simply insert the SIM card into your device and follow the activation instructions included in your package or visit our website for step-by-step guidance."
  },

  {
    question: "Does GoLite Mobile offer international roaming?",
    answer:
      "Yes! Our postpaid plans offer free roaming in Canada & Mexico. For other international destinations, we have affordable add-on packages."
  }
];
  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);
  return (
    <>
    <Header />
    <div className="w-full dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#FF6A3D] rounded-2xl overflow-hidden">
          {/* Left */}
          <div className="p-8 md:p-12 text-white max-w-xl">
            <h1 className="text-xl md:text-4xl font-bold leading-tight">
              Stream Without Limits:
              <br />
              Tailored Plans for Streaming Enthusiasts!
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-90">
              Enjoy uninterrupted, high-speed streaming with our premium mobile plans
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full md:w-1/2 h-full flex p-2 justify-end">
            <img
              src="/img/specialStreaming-enthusiasts.png"
              alt="Streaming Gamer"
              className="object-cover h-[25rem] p-4"
            />
          </div>
        </div>
      </section>

      {/* Title */}
      {/* <section className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Shop Streaming Enthusiasts Plans
        </h2>
      </section> */}

      {/* Tabs */}
      <StreamingPlanSlider />
      {/* <StreamingSlider /> */}

      {/* FAQ */}
      <section className="mx-auto px-4 pt-20 pb-20 dark:bg-gray-900 bg-[#FFF7F7] w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        <div className=" py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4">
              {leftColumn.map((item, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm">
                      <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium dark:text-gray-100 text-gray-800 focus:outline-none">
                        <span>{item.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </DisclosureButton>
                      <DisclosurePanel className="px-4 py-3 text-gray-700 break-words dark:text-gray-300">
                        {item.answer}
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
    
            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-4">
              {rightColumn.map((item, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm">
                      <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium dark:text-gray-100 text-gray-800 focus:outline-none">
                        <span>{item.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </DisclosureButton>
                      <DisclosurePanel className="px-4 py-3 text-gray-700 break-words dark:text-gray-300">
                        {item.answer}
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
