"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { lineInquiryAction } from "../actions/lineInquiryAction";

export default function MyAccountPage() {

  const [lineData, setLineData] = useState<any>(null);
  const [lineError, setLineError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLine() {
      const result = await lineInquiryAction("WN467");

      if (result.status) {
        console.log("Line Data:", result.data);
        setLineData(result.data);
      } else {
        console.log("Line Error:", result.error);
        setLineError(result.error || "Failed");
      }
    }

    loadLine();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-8">

        <h2 className="text-xl font-semibold mb-4">
          My Account
        </h2>

        {/* ERROR */}
        {lineError && (
          <p className="text-red-600">
            {lineError}
          </p>
        )}

        {/* DATA */}
        {lineData && (
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(lineData, null, 2)}
          </pre>
        )}

      </main>

      <Footer />
    </div>
  );
}
