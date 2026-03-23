"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BUSINESS_NEEDS_OPTIONS = [
  "1 - 5",
  "6 - 20 ",
  "21 - 50",
  "50+",
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessEmail: "",
    businessNeeds: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    const fullName = formData.fullName.trim();
    const businessName = formData.businessName.trim();
    const businessEmail = formData.businessEmail.trim();
    const businessNeeds = formData.businessNeeds.trim();
    const message = formData.message.trim();

    if (!fullName || !businessName || !businessEmail || !businessNeeds || !message) {
      setSubmitStatus({ type: "error", message: "All fields are required." });
      return;
    }

    if (!validateEmail(businessEmail)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (!BASE_URL) {
      setSubmitStatus({ type: "error", message: "API configuration error." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/api/business-contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
                                full_name: fullName,
                                business_name: businessName,
                                business_email: businessEmail,
                                business_needs: businessNeeds,
                                message: message,
                            }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Your message has been sent successfully!",
        });
        setFormData({ fullName: "", businessName: "", businessEmail: "", businessNeeds: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data?.error || data?.message || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">

        {/* Full-page section with light green background */}
        <section
          className="relative min-h-screen flex items-center py-16 px-6 md:px-12 lg:px-20"
          style={{ backgroundColor: "#dff0e0" }}
        >
          {/* "Need Help?" vertical tab on the right edge */}
          <div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
            style={{ writingMode: "vertical-rl" }}
          >
            <div
              className="bg-orange-500 text-white text-sm font-semibold px-2 py-4 cursor-pointer select-none"
              style={{ borderRadius: "6px 0 0 6px", letterSpacing: "0.05em" }}
            >
              Need Help?
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* LEFT — Headline + Illustration */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                Let's talk about your
              </h2>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight" style={{ color: "#22c55e" }}>
                Business.
              </h2>
              <div className="relative w-full" style={{ minHeight: "360px" }}>
                <Image
                  src="/img/businessContact.webp"
                  alt="Business growth illustration"
                  fill
                  className="object-contain object-left-bottom"
                />
              </div>
            </div>

            {/* RIGHT — White card with form */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-md px-8 py-10 md:px-10 md:py-12">

                {/* Card header */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">
                  Contact us
                </h3>
                <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
                  Smart solutions start with the right fit.<br />
                  Let's design a custom plan tailored to your business goals.
                </p>

                {submitStatus.type && (
                  <div
                    className={`mb-5 p-3 rounded text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* Row 1: Full Name + Business Name */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your Full Name"
                        disabled={isSubmitting}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your Business Name"
                        disabled={isSubmitting}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Row 2: Business E-mail + Business Needs */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Business E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        placeholder="Enter Business E-mail"
                        disabled={isSubmitting}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Business Needs Plans<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessNeeds"
                        value={formData.businessNeeds}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="" disabled>Select</option>
                        {BUSINESS_NEEDS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-gray-800">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message — full width */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      disabled={isSubmitting}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-y"
                    />
                  </div>

                  {/* Submit button — full width, green */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#22c55e" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#22c55e")}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>

                </form>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}