"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";

/* ---------------- TYPES ---------------- */

type Errors = {
  full_name?: string;
  dob?: string;
  employment_status?: string;
  agency_name?: string;
  email?: string;
  position?: string;
  proof_type?: string;
  document_file?: string;
};

/* ---------------- COMPONENT ---------------- */

export default function FirstResponderDiscountApplication() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  


  // ✅ ENV BASE URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const form = e.currentTarget;
    const newErrors: Errors = {};

    const fullName = form.full_name.value.trim();
    const dob = form.dob.value;
    const employmentStatus = form.employment_status.value;
    const agencyName = form.agency_name.value.trim();
    const email = form.email.value.trim();
    const position = form.position.value;
    const proofType = form.proof_type.value;
    const file = form.document_file.files[0];

    /* -------- VALIDATION -------- */

    if (!fullName) newErrors.full_name = "Full Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!employmentStatus)
      newErrors.employment_status = "Select employment status";
    if (!agencyName)
      newErrors.agency_name = "Agency/Department Name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter valid email";
    }

    if (!position) newErrors.position = "Select position";
    if (!proofType) newErrors.proof_type = "Select proof type";
    if (!file) newErrors.document_file = "Upload document";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!API_BASE_URL) {
      setMessage("API Base URL not configured");
      return;
    }

    /* -------- SUBMIT -------- */

    setLoading(true);
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/responder/first-responder-discount-form`,
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
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <Header />

      <section className="mx-auto px-4 py-16 dark:bg-gray-900">
        <div className="max-w-7xl  grid lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="/img/firstResponder.webp"
              className="rounded-2xl h-[50rem] w-full max-w-md object-cover"
            />
          </div>

          {/* FORM */}
          <div>
            <h1 className="text-3xl font-semibold mb-3">
              First Responder Discount Application
            </h1>

            <p className="text-gray-600 mb-8 dark:text-gray-300">
              Verify your first responder status to unlock special discounts.
            </p>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid md:grid-cols-2 gap-10"
            >

              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-6">Your personal data</h3>

                <InputField
                  label="Full Name"
                  name="full_name"
                  error={errors.full_name}
                />

                <DateField
                  label="Date of Birth"
                  name="dob"
                  error={errors.dob}
                />

                <SelectField
                  className="dark:bg-gray-800"
                  label="Employment Status"
                  name="employment_status"
                  options={["Active", "Retired"]}
                  error={errors.employment_status}
                />

                <InputField
                  label="Agency / Department Name"
                  name="agency_name"
                  error={errors.agency_name}
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  error={errors.email}
                />
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-6">Identity documents</h3>

                <SelectField
                  label="Position"
                  name="position"
                  options={[
                    "Firefighter",
                    "EMT",
                    "Paramedic",
                    "Police Officer or Other",
                  ]}
                  error={errors.position}
                />

                <SelectField
                  label="Proof of Service"
                  name="proof_type"
                  options={[
                    "Department/Agency ID Badge",
                    "Pay Stub",
                    "Employment Verification Letter",
                    "State-Issued Certification or License",
                  ]}
                  error={errors.proof_type}
                />

                <FileUpload
                  fileName={fileName}
                  setFileName={setFileName}
                  error={errors.document_file}
                />
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 text-center mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="border-2 border-orange-500 text-orange-500 px-14 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {message && (
                <p className="md:col-span-2 text-center text-green-600">
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

/* ---------------- REUSABLE COMPONENTS ---------------- */

const InputField = ({ label, name, type = "text", error }: any) => (
  <div className="mb-6">
    <label className="block mb-2 font-medium">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      type={type}
      className="w-full border rounded-xl px-4 py-3 dark:bg-gray-800"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const DateField = ({ label, name, error }: any) => (
  <div className="mb-6">
    <label className="block mb-2 font-medium">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      type="date"
      className="w-full border rounded-xl px-4 py-3"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const SelectField = ({ label, name, options, error }: any) => (
  <div className="mb-6">
    <label className="block mb-2 font-medium">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      className="w-full border rounded-xl px-4 py-3 bg-white dark:bg-gray-800"
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const FileUpload = ({ fileName, setFileName, error }: any) => (
  <div className="mb-6">
    <label className="block mb-2 font-medium">
      Upload Supporting Document <span className="text-red-500">*</span>
    </label>

    <label className="flex justify-center bg-orange-500 text-white py-3 rounded-xl cursor-pointer">
      Select File
      <input
        name="document_file"
        type="file"
        hidden
        onChange={(e) =>
          setFileName(e.target.files?.[0]?.name || "")
        }
      />
    </label>

    {fileName && <p className="mt-2 text-sm">{fileName}</p>}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
