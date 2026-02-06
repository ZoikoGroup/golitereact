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

    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value.trim();
    const dob = (form.elements.namedItem("dob") as HTMLInputElement).value;
    const email = (form.elements.namedItem("student_email") as HTMLInputElement).value.trim();
    const documentType = (form.elements.namedItem("document_type") as HTMLSelectElement).value;
    const fileInput = form.elements.namedItem("document_file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    // ---------------- VALIDATION ----------------

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

    // ---------------- SUBMIT ----------------

    setLoading(true);
    const formData = new FormData(form);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/student-discount-form`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Submission failed");
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

      <section className=" mx-auto px-4 py-16 dark:bg-gray-900">
        <div className="max-w-7xl grid lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="/img/studentForm.webp"
              alt="Student"
              className="rounded-2xl h-[37rem] w-full max-w-md object-cover"
            />
          </div>

          {/* FORM */}
          <div>
            <h1 className="text-3xl font-semibold dark:text-gray-100 text-gray-900 mb-3">
              Student Discount Application
            </h1>

            <p className="text-gray-600 mb-8 dark:text-gray-300">
              Students deserve seamless connectivity at an affordable price.
              Apply now for our exclusive student discount and enjoy great
              savings on your mobile plan.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-x-10 gap-y-8"
              noValidate
              encType="multipart/form-data"
            >

              {/* LEFT COLUMN */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  Your personal data
                </h3>

                <div className="space-y-6">

                  {/* FULL NAME */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      name="full_name"
                      type="text"
                      placeholder="Enter your Full Name"
                      className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>

                    <input
                      name="dob"
                      type="date"
                      className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      School/University E-mail ID{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      name="student_email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border px-4 py-3"
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

                  {/* DOCUMENT TYPE */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Verification Document type{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      name="document_type"
                      className="w-full rounded-xl border px-4 py-3"
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

                  {/* FILE */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Upload Supporting Document{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <label className="flex w-full justify-center rounded-xl bg-orange-500 px-4 py-3 text-white cursor-pointer">
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
                      <p className="mt-2 text-sm text-gray-600">
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
