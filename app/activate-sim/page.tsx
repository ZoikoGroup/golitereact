"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function ActivateSimPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9]">
      <Header />

      <main className="flex-grow py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h1 className="text-3xl font-bold mb-2">
            Activate Your GoLite Mobile SIM
          </h1>

          <p className="text-gray-500 mb-10">
            Get started with your GoLite connection in just a few simple steps.
          </p>

          <h3 className="text-orange-600 font-semibold mb-8">
            Select your SIM Type
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* pSIM */}
            <div
              onClick={() => router.push("/psim-activate")}
              className="sim-card"
            >
              <div className="text-5xl mb-4">📱</div>
              <h4 className="font-semibold">pSIM</h4>
            </div>

            {/* eSIM */}
            <div
              onClick={() => router.push("/esim-compatible")}
              className="sim-card"
            >
              <div className="text-5xl mb-4">💾</div>
              <h4 className="font-semibold">eSIM</h4>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .sim-card {
          background: white;
          border: 2px solid #ff5a1f;
          border-radius: 14px;
          padding: 60px 20px;
          cursor: pointer;
          transition: 0.2s;
        }

        .sim-card:hover {
          background: #fff4ee;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
