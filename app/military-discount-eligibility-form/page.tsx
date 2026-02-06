"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Errors = {
  full_name?: string;
  email?: string;
  dob?: string;
  id_type?: string;
  document_file?: string;
};

export default function MilitaryDiscountEnrollment() {
  const [errors, setErrors] = useState<Errors>({});
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate age from DOB
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const form = e.currentTarget;
    const newErrors: Errors = {};

    const fullName = form.full_name.value.trim();
    const email = form.email.value.trim();
    const dob = form.dob.value;
    const idType = form.id_type.value;
    const file = form.document_file.files[0];

    // VALIDATIONS
    if (!fullName) newErrors.full_name = "Full Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!dob) newErrors.dob = "Date of Birth is required";
    else if (calculateAge(dob) < 18)
      newErrors.dob = "You must be at least 18 to qualify";

    if (!idType) newErrors.id_type = "Select a government-issued ID";
    if (!file) newErrors.document_file = "Supporting document is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      // Prepare FormData for Django API
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("id_type", idType);
      formData.append("document_file", file);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      // Call Django API
      const response = await fetch(
        `${API_BASE_URL}/api/military-discount/enrollment`,
        {
          method: "POST",
          body: formData,
          // headers: {
          //   Authorization: `Bearer YOUR_API_TOKEN`, // uncomment if needed
          // },
        }
      );

      let result: any = {};
      try {
        result = await response.json();
      } catch (_) {
        result = { message: response.statusText };
      }

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setMessage("Enrollment submitted successfully ✅");
      setFileName("");
      setErrors({});
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="dark:bg-gray-900 mx-auto px-4 py-16">
        <div className="max-w-7xl grid lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="/img/melitery.webp"
              alt="Military Discount"
              className="rounded-2xl w-full h-[37rem] max-w-md object-cover"
            />
          </div>

          {/* FORM */}
          <div>
            <h1 className="text-3xl font-semibold dark:text-white text-gray-900 mb-3">
              Military Discount Eligibility Form
            </h1>

            <p className="text-gray-600 mb-8 dark:text-gray-300">
              Verify your military status to receive exclusive discounts on your mobile plan.
              Please provide valid proof of service to qualify. <b>This is applicable for active Army Personnel & Army Veterans.</b>
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-x-10 gap-y-8"
              noValidate
            >
              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-6">Your personal data</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Enter your Full Name"
                      className="dark:bg-gray-800 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="dark:bg-gray-800 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date of Birth *
                    </label>
                    <input
                      name="dob"
                      type="date"
                      className="dark:bg-gray-800 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-6">Identity documents</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Government-Issued ID *
                    </label>
                    <select
                      name="id_type"
                      className="dark:bg-gray-800 w-full rounded-xl border px-4 py-3 bg-white focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select ID Type</option>
                      <option>DD Form 214 (Certificate of Release or Discharge from Active Duty)</option>
                      <option>Military Retiree ID Card</option>
                      <option>VA Veteran ID Card (VIC)</option>
                      <option>State-Issued Driver's License/ID with Veteran Designation</option>
                      <option>Active Duty Common Access Card (CAC) for current military members</option>
                    </select>
                    {errors.id_type && (
                      <p className="text-red-500 text-sm mt-1">{errors.id_type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Upload Supporting Document *
                    </label>
                    <label className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-white font-medium cursor-pointer hover:bg-orange-600 transition">
                      Select File
                      <input
                        name="document_file"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name || "")
                        }
                      />
                    </label>

                    {fileName && (
                      <p className="mt-2 text-sm text-gray-600 truncate">{fileName}</p>
                    )}

                    {errors.document_file && (
                      <p className="text-red-500 text-sm mt-1">{errors.document_file}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 flex justify-center mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl border-2 border-orange-500 px-14 py-3 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {message && (
                <p className="md:col-span-2 text-center text-green-600 font-medium">{message}</p>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
