"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState } from "react";

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

export default function FirstResponderDiscountApplication() {
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
    const employmentStatus = form.employment_status.value;
    const agencyName = form.agency_name.value.trim();
    const email = form.email.value.trim();
    const position = form.position.value;
    const proofType = form.proof_type.value;
    const file = form.document_file.files[0];

    if (!fullName) newErrors.full_name = "Full Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!employmentStatus)
      newErrors.employment_status = "Select employment status";
    if (!agencyName)
      newErrors.agency_name = "Agency/Department Name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!position) newErrors.position = "Select your position";
    if (!proofType) newErrors.proof_type = "Select ID type";
    if (!file)
      newErrors.document_file = "Supporting document is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const formData = new FormData(form);

    try {
        console.log("Submitting form data:", Array.from(formData.entries()));
      const response = await fetch(
        "https://api.golite.com/first-responder-discount-form",
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
              src="/img/firstResponder.webp"
              alt="First Responder"
              className="rounded-2xl h-[50rem] w-full max-w-md object-cover border border-gray"
            />
          </div>

          {/* Form */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              First Responder Discount Application
            </h1>

            <p className="text-gray-600 mb-8">
              Exclusive savings for those who serve our communities. Confirm
              your status as an active or retired first responder to unlock
              special discounts.
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
                  <InputField
                    label="Full Name"
                    name="full_name"
                    placeholder="Enter your Full Name"
                    error={errors.full_name}
                  />

                  <DateField
                    label="Date of Birth"
                    name="dob"
                    error={errors.dob}
                  />

                  <SelectField
                    label="Current Employment Status"
                    name="employment_status"
                    options={["Active", "Retired"]}
                    error={errors.employment_status}
                  />

                  <InputField
                    label="Agency/Department Name"
                    name="agency_name"
                    placeholder="Enter Agency/Department Name"
                    error={errors.agency_name}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Enter your Email Address"
                    type="email"
                    error={errors.email}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-6">
                  Identity documents
                </h3>

                <div className="space-y-6">
                  <SelectField
                    label="Your Position"
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
                      "Pay Stub (Showing employer & role, without sensitive financial info)",
                      "Employment Verification Letter from the agency",
                      "State-Issued First Responder Certification or License",
                    ]}
                    error={errors.proof_type}
                  />

                  <FileUpload
                    error={errors.document_file}
                    fileName={fileName}
                    setFileName={setFileName}
                  />
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

/* ---------- Reusable Components (Design Preserved) ---------- */

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  error,
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const DateField = ({ label, name, error }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      type="date"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, options, error }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:ring-orange-500"
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FileUpload = ({ error, fileName, setFileName }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-3">
      Upload Supporting Document <span className="text-red-500">*</span>
    </label>
    <label className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-white font-medium cursor-pointer hover:bg-orange-600 transition">
      Select File
      <input
        name="document_file"
        type="file"
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
      />
    </label>
    {fileName && (
      <p className="mt-2 text-sm text-gray-600 truncate">{fileName}</p>
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
