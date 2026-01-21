"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StreamingSlider from "../components/StreamingSlider";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
export default function StreamingPlans() {


  const faqs = [
  {
    question: "What is international long distance calling?",
    answer: "International long distance calling allows you to make phone calls from the United States to people in other countries."
  },
  {
    question: "Are international calls included in Zoiko Mobile plans?",
    answer: "Yes, all Zoiko Mobile plans include free international calling minutes to over 246 countries. The allowance varies depending on the destination country and whether you are calling a landline or mobile number."
  },
  {
    question: "What happens if I exceed my data limit?",
    answer: "Zoiko Mobile offers free international calling minutes to over 246 countries as part of every plan, with no additional activation or hidden fees. Most other carriers charge extra for similar services or cover fewer countries, making Zoiko Mobile a more affordable and comprehensive choice."
  },
  {
    question: "Do I need to activate international calling on my Zoiko Mobile plan?",
    answer: "No activation is required. International calling is automatically included in all Zoiko Mobile plans."
  },
  {
    question: "Can I use Zoiko Mobile's international calling feature on any device?",
    answer: "Yes, you can use Zoiko Mobile's international calling feature on any device compatible with our network, including smartphones and tablets."
  },
  {
    question: "How do I make an international call with Zoiko Mobile?",
    answer: (
      <ol className="list-decimal pl-5 break-words">
        <li>Dial "+" or "011" (the international dialing code).</li>
        <li>Enter the country code of the destination you are calling.</li>
        <li>Dial the phone number, including the area code if required.</li>
        <li>Press the call button to connect.</li>
      </ol>
    )
  }
];
  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);
  return (
    <>
    <Header />
    <div className="w-full">
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
      <section className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Shop Streaming Enthusiasts Plans
        </h2>
      </section>

      {/* Tabs */}
      <StreamingSlider />

      {/* FAQ */}
      <section className="mx-auto px-4 pt-20 pb-20  bg-[#FFF7F7] w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        <div className=" py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4">
              {leftColumn.map((item, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                      <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
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
                      <DisclosurePanel className="px-4 py-3 text-gray-700 break-words">
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
                    <div className="border border-gray-200 rounded-md bg-white shadow-sm">
                      <DisclosureButton className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
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
                      <DisclosurePanel className="px-4 py-3 text-gray-700 break-words">
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
