"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuccessModal from "../components/SuccessModal";
import { checkDeviceCompatibility } from "../utils/vcareapi";

export default function EsimCompatiblePage() {

  const [imei, setImei] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  // ✅ SAME VCARD LOGIC AS BYOD
  const handleCheckDevice = async () => {

    if (!imei) {
      setInputError("IMEI or MEID is required");
      return;
    }

    if (!/^\d+$/.test(imei)) {
      setInputError("Only numbers are allowed");
      return;
    }

    if (imei.length < 14) {
      setInputError("IMEI or MEID must be at least 14 digits");
      return;
    }

    setLoading(true);
    setInputError("");

    try {
      const response = await checkDeviceCompatibility(imei);
      const data = response.data;

      const attCompatibility =
        data?.data?.RESULT?.responseDetails?.inquireDeviceStatusResponse
          ?.deviceStatusDetails?.attCompatibility;

      if (attCompatibility === "GREEN") {
        setModalType("success");
        setModalMessage(
          "Great news! Your device is eSIM compatible with GoLite Mobile."
        );
      } else {
        setModalType("error");
        setModalMessage(
          "Sorry, this device is not eSIM compatible with GoLite Mobile."
        );
      }

      setModalOpen(true);
    } catch (error) {
      setModalType("error");
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <section className="py-20 dark:bg-gray-900 bg-[#f6faf4]">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-xl shadow text-center">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Check eSIM Compatibility
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your IMEI number to see if your device supports eSIM.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter IMEI or MEID"
              value={imei}
              onChange={(e) => {
                setImei(e.target.value.replace(/\D/g, ""));
                setInputError("");
              }}
              maxLength={15}
              className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handleCheckDevice}
              disabled={loading}
              className="bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Checking..." : "Check Compatibility"}
            </button>

            {inputError && (
              <p className="text-red-600 font-semibold">{inputError}</p>
            )}
          </div>
        </div>
      </section>

      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />

      <Footer />
    </>
  );
}
