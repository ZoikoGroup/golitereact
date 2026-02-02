"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PsimActivatePage() {

  const router = useRouter();
  const [numberOption, setNumberOption] = useState("new");

  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setNumberOption(value);

    // 👉 Redirect when existing number selected
    if (value === "existing") {
      router.push("/existing-sim-port");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9]">
      <Header />

      <main className="flex-grow py-14">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-6 text-center">
            SIM Activation Form
          </h2>

          {/* Number Option */}
          <label className="label">Your Number Options</label>
          <select
            className="input"
            value={numberOption}
            onChange={handleNumberChange}
          >
            <option value="new">
              I want new GoLite mobile number.
            </option>

            <option value="existing">
              Transfer existing mobile number to GoLite.
            </option>
          </select>

          {/* Only show fields if NEW number */}
          {numberOption === "new" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="label">Full Name *</label>
                <input
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="label">Email Address *</label>
                <input
                  className="input"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          )}

          <button className="btn-primary w-full mt-6">
            Fetch Information
          </button>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        .label {
          font-size: 13px;
          font-weight: 600;
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px;
          margin-top: 4px;
        }

        .btn-primary {
          background: #ff5a1f;
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
        }

        .btn-primary:hover {
          background: #e14c15;
        }
      `}</style>
    </div>
  );
}
