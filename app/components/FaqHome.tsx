"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";



const faqs = [
  {
    question: "What is GoLite Mobile?",
    answer:
      "GoLite Mobile is a wireless service provider offering affordable prepaid and postpaid plans with nationwide coverage. We combine great value with eco-friendly initiatives, donating a portion of every plan to ocean conservation efforts."
  },
  {
    question: "What makes GoLite Mobile eco-friendly?",
    answer:
      "We’re committed to protecting the planet through initiatives like beach and ocean cleanups, e-waste recycling, plastic-free packaging, and working towards carbon neutrality. By choosing GoLite, you’re helping us make a difference for our oceans."
  },
  {
    question: "Is GoLite Mobile available nationwide?",
    answer:
      "Yes, GoLite Mobile offers reliable nationwide coverage across the U.S. with no hidden fees or surprises."
  },
  {
    question: "How do I sign up for GoLite Mobile?",
    answer:
      "Signing up is easy! Visit our website, choose a plan, and follow the instructions. You can also bring your own device or purchase a new one from us."
  },
  {
    question: "What is Data Rollover?",
    answer:
      "Data Rollover lets you keep unused high-speed data for the next month (limits apply depending on your plan). It’s our way of making sure you get the most out of your plan."
  }
];


function IntlFaqs() {
  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);

  return (
    <div className="bg-gray-50 py-10 dark:bg-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftColumn.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-md bg-white dark:bg-gray-800 shadow-sm">
                  <DisclosureButton className="w-full dark:text-gray-200 text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
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
                <div className="border border-gray-200 rounded-md dark:bg-gray-800 bg-white shadow-sm">
                  <DisclosureButton className="w-full dark:text-gray-200 text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 focus:outline-none">
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
  );
}

export default IntlFaqs;
