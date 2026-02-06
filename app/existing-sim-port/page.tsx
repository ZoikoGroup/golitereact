"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ExistingSimPortPage() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-[#f6f7f9]">
      <Header />

      <main className="flex-grow py-14">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-6 text-center">
            SIM Activation Form
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="label">Email Address *</label>
              <input className="input" placeholder="Enter email address" />
            </div>

            <div>
              <label className="label">Number Option</label>
              <select className="input">
                <option>Transfer existing mobile number to GoLite</option>
              </select>
            </div>

          </div>

          <button className="btn-primary mt-6">
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
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
