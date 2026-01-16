"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";

type Errors = {
  full_name?: string;
  dob?: string;
  student_email?: string;
  document_type?: string;
  document_file?: string;
};

export default function StudentDiscountApplication() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const form = e.currentTarget;
    const newErrors: Errors = {};

    const fullName = form.full_name.value.trim();
    const dob = form.dob.value;
    const email = form.student_email.value.trim();
    const documentType = form.document_type.value;
    const file = form.document_file.files[0];

    if (!fullName) newErrors.full_name = "Full Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";

    if (!email) {
      newErrors.student_email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.student_email = "Enter a valid email";
    }

    if (!documentType)
      newErrors.document_type = "Select a document type";

    if (!file)
      newErrors.document_file = "Supporting document is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const formData = new FormData(form);

    try {
        console.log("Submitting form data:", Array.from(formData.entries()));
      const response = await fetch(
        "https://api.golite.com/student-discount-form",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setMessage("Application submitted successfully ✅");
      setFileName("");
      setErrors({});
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/img/studentForm.webp"
              alt="Student"
              className="rounded-2xl h-[37rem] w-full max-w-md object-cover"
            />
          </div>

          {/* Form */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              Student Discount Application
            </h1>

            <p className="text-gray-600 mb-8">
              Students deserve seamless connectivity at an affordable price. Apply now for our exclusive student discount and enjoy great savings on your mobile plan
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-x-10 gap-y-8"
              noValidate
            >
              {/* LEFT COLUMN */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  Your personal data
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Enter your Full Name"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="dob"
                      type="date"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      School/University E-mail ID{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="student_email"
                      type="email"
                      placeholder="Enter School/University E-mail ID"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    {errors.student_email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.student_email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  Identity documents
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Verification Document type{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="document_type"
                      className="appearance-none w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Document</option>
                      <option>Valid Student ID (Front & Back)</option>
                      <option>Enrollment Verification Letter</option>
                      <option>Transcript</option>
                    </select>
                    {errors.document_type && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.document_type}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-3">
                      Upload Supporting Document{" "}
                      <span className="text-red-500">*</span>
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
                      <p className="mt-2 text-sm text-gray-600 truncate">
                        {fileName}
                      </p>
                    )}

                    {errors.document_file && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.document_file}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
                <p className="md:col-span-2 text-center text-green-600 font-medium">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
