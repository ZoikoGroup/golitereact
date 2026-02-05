"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";

type ExistingPlanOption = {
  enrollmentId: string;
  esnNumber: string | null;
  zipCode: string | null;
  planDescription: string;
  isEsim: boolean;
};

export default function SimActivationForm() {
    const [showDeviceCheck, setShowDeviceCheck] = useState(true);
const [deviceImei, setDeviceImei] = useState("");
const [deviceChecking, setDeviceChecking] = useState(false);


  const [step, setStep] = useState<"fetchCustomer" | "fetchLine">("fetchCustomer");
  const [email, setEmail] = useState("");
  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExtraFields, setShowExtraFields] = useState(false);

   const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [plans, setPlans] = useState<ExistingPlanOption[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState("");
  const [simType, setSimType] = useState("");
  const [simSerial, setSimSerial] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

    const checkDeviceCompatibility = async () => {
    if (!deviceImei) {
        setPopup({ message: "IMEI is required", type: "error" });
        return;
    }

    try {
        setDeviceChecking(true);

        const res = await fetch("/api/vcare/check-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imei: deviceImei }),
        });

        const result = await res.json();

        // 👉 Adjust condition based on API response
        if (!result?.status && !result?.data) {
        setPopup({
            message: "Device is not compatible",
            type: "error",
        });
        return;
        }

        // ✅ Device OK
        setImei(deviceImei); // autofill IMEI input
        setShowDeviceCheck(false);

        setPopup({
        message: "Device is compatible ✅",
        type: "success",
        });

    } catch (err) {
        setPopup({
        message: "Device compatibility check failed",
        type: "error",
        });
    } finally {
        setDeviceChecking(false);
    }
    };

  const fetchCustomerInfo = async () => {
    setLoading(true);
    setShowExtraFields(false);
    setPlans([]);
    setSelectedEnrollment("");
    setSimType("");
    setSimSerial("");
    setZipCode("");

    try {
      const res = await fetch("/api/customer-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!result.status || !Array.isArray(result.data)) {
        // alert(result.error ?? "No plans found for this email");
        setPopup({
          message: result.error ?? "No plans found for this email",
          type: "error",
        });
        return;
      }

      /** 🔥 Map required fields only */
      const mappedPlans: ExistingPlanOption[] = result.data.map(
        (item: any) => ({
          enrollmentId: item.enrollment_id,
          esnNumber: item.esn_number ?? null,
          zipCode: item.zip_code ?? null,
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
        // alert("No valid plans found");
        setPopup({
            message: result.error ?? "No valid plans found",
            type: "error",
          });
          return;
        }

      setPlans(uniquePlans);
      setShowExtraFields(true);
    } catch (err) {
      console.error("Customer info fetch error:", err);
      // alert("Something went wrong while fetching customer info");
      setPopup({
        message: "Something went wrong while fetching customer info",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: Record<string, string> = {};

  if (step === "fetchCustomer") {

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await fetchCustomerInfo();
    setStep("fetchLine");

  } else {

    if (!selectedEnrollment) {
      newErrors.plan = "Please select a plan";
    }

    if (!imei) {
      newErrors.imei = "IMEI number is required";
    } else if (!/^\d{14,}$/.test(imei)) {
      newErrors.imei = "IMEI must be at least 14 digits";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // ✅ CALL ACTIVATE API HERE
    await activateSim();
  }
};


const activateSim = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/activate-sim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enrollmentId: selectedEnrollment,
        imeiNumber: imei,
        simSerialNumber: simSerial,
        zipCode: zipCode,
      }),
    });

    const result = await res.json();

    if (!result.status) {
      // alert(result.error ?? "SIM activation failed");
      setPopup({
        message: result.error ?? "SIM activation failed",
        type: "error",
      });
      return;
    }

    setPopup({
      message: "SIM activated successfully 🎉",
      type: "success",
    });

  } catch (err) {
    console.error(err);
    // alert("Error activating SIM");
    setPopup({
      message: "Error activating SIM",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <Header />

      {!showDeviceCheck && (
        <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl p-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            SIM Activation Form
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={`w-full border rounded-md px-4 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  required={showExtraFields}
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
                        setSimType(selected.isEsim ? "eSIM" : "Physical SIM");
                        setZipCode(selected.zipCode ?? "");
                      } else {
                        setSimSerial("");
                        setSimType("");
                      }
                    }}
                    
                  >
                    <option value="">Select a plan</option>
                    {plans
                      .filter((plan) => !!plan.esnNumber) // ✅ only plans with ESN/ICCID
                      .map((plan) => (
                        <option
                          key={plan.enrollmentId}
                          value={plan.enrollmentId}
                          data-esin-number={plan.esnNumber ?? ""}
                          data-zip={plan.zipCode ?? ""}
                        >
                          {plan.planDescription}
                        </option>
                      ))}
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-sm mt-1">{errors.plan}</p>
                  )}
                </div>
                      
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Zip Code
                  </label>
                  <input
                    value={zipCode}
                    readOnly
                    className="w-full border rounded-md px-4 py-2 bg-gray-100"
                  />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    IMEI Number (Find by dialing *#06#) *
                  </label>
                  <input
                    value={imei}
                    onChange={(e) => {
                      setImei(e.target.value);
                      setErrors((prev) => ({ ...prev, imei: "" }));
                    }}
                    className={`w-full border rounded-md px-4 py-2 ${
                      errors.imei ? "border-red-500" : ""
                    }`}
                  />

                  {errors.imei && (
                    <p className="text-red-500 text-sm mt-1">{errors.imei}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm fnt-medium mb-1">
                    SIM Serial Number
                  </label>
                  <input
                    value={simSerial}
                    readOnly
                    className="w-full border rounded-md px-4 py-2 bg-gray-100"
                  />
                </div>
                </div>
              </>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading || (showExtraFields && !selectedEnrollment)}
                className="bg-orange-500 text-white px-10 py-3 rounded-full disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Fetch Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    {showDeviceCheck && (
        <div className="min-h-screen flex items-center justify-center px-4">
        <div className="inset-0 z-[1100] flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg">

            <h2 className="text-xl font-semibold mb-4 text-center">
                Device Compatibility Check
            </h2>

            <input
                value={deviceImei}
                onChange={(e) => setDeviceImei(e.target.value)}
                placeholder="Enter IMEI Number"
                className="w-full border rounded-md px-4 py-2 mb-4"
            />

            <button
                onClick={checkDeviceCompatibility}
                disabled={deviceChecking}
                className="w-full bg-orange-500 text-white py-2 rounded-md"
            >
                {deviceChecking ? "Checking..." : "Check Device"}
            </button>

            </div>
        </div>
        </div>
        )}
      <Footer />
    </>
  );
}
