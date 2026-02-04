"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type ExistingPlanOption = {
  enrollmentId: string;
  esnNumber: string | null;
  planDescription: string;
  isEsim: boolean;
};

export default function SimActivationForm() {
  const [step, setStep] = useState<"fetchCustomer" | "fetchLine">("fetchCustomer");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExtraFields, setShowExtraFields] = useState(false);

  const [plans, setPlans] = useState<ExistingPlanOption[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState("");
  const [simType, setSimType] = useState("");
  const [simSerial, setSimSerial] = useState("");

  const handleFetchInformation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    setLoading(true);
    setShowExtraFields(false);
    setPlans([]);
    setSelectedEnrollment("");
    setSimType("");
    setSimSerial("");

    try {
      const res = await fetch("/api/customer-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!result.status || !Array.isArray(result.data)) {
        alert(result.error ?? "No plans found for this email");
        return;
      }

      /** 🔥 Map required fields only */
      const mappedPlans: ExistingPlanOption[] = result.data.map(
        (item: any) => ({
          enrollmentId: item.enrollment_id,
          esnNumber: item.esn_number ?? null,
          planDescription: item.plan_description,
          isEsim: item.is_esim === "Y",
        })
      );

      /** ✅ Remove duplicate enrollments */
      const uniquePlans = Object.values(
        mappedPlans.reduce((acc: any, p) => {
          acc[p.enrollmentId] = p;
          return acc;
        }, {})
      ) as ExistingPlanOption[];

      if (!uniquePlans.length) {
        alert("No valid plans found");
        return;
      }

      setPlans(uniquePlans);
      setShowExtraFields(true);
    } catch (err) {
      console.error("Customer info fetch error:", err);
      alert("Something went wrong while fetching customer info");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLineInfo = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/userLine-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enrollmentId: selectedEnrollment,
      }),
    });

    const result = await res.json();

    console.log("Line info result:", result);

    // 👉 handle response here
  } catch (err) {
    console.error(err);
    alert("Error fetching line info");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl p-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            SIM Activation Form
          </h1>

          <form className="space-y-6" onSubmit={handleFetchInformation}>
            {/* STEP 1 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Number Options
              </label>
              <select className="w-full border rounded-md px-4 py-2">
                <option>I want new GoLite mobile number.</option>
                <option>I want to port my existing number.</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  required
                />
              </div>
            </div>

            

            {/* STEP 2 */}
            {showExtraFields && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Existing Plans <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={selectedEnrollment}
                    className="w-full border rounded-md px-4 py-2"
                    onChange={(e) => {
                      const enrollmentId = e.target.value;
                      setSelectedEnrollment(enrollmentId);

                      const selected = plans.find(
                        (p) => p.enrollmentId === enrollmentId
                      );

                      if (selected) {
                        setSimSerial(selected.esnNumber ?? "");
                        setSimType(
                          selected.isEsim ? "eSIM" : "Physical SIM"
                        );
                      } else {
                        setSimSerial("");
                        setSimType("");
                      }
                    }}
                    required
                  >
                    <option value="">Select a plan</option>
                    {plans
                      .filter((plan) => !!plan.esnNumber) // ✅ only plans with ESN/ICCID
                      .map((plan) => (
                        <option
                          key={plan.enrollmentId}
                          value={plan.enrollmentId}
                          data-esin-number={plan.esnNumber ?? ""}
                        >
                          {plan.planDescription}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SIM Type
                  </label>
                  <input
                    value={simType}
                    readOnly
                    className="w-full border rounded-md px-4 py-2 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SIM Serial Number
                  </label>
                  <input
                    value={simSerial}
                    readOnly
                    className="w-full border rounded-md px-4 py-2 bg-gray-100"
                  />
                </div>
              </>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-10 py-3 rounded-full disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Fetch Information"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
