"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { lineInquiryAction } from "../actions/lineInquiryAction";
import { orderByUserAction } from "../actions/orderByUserAction";

export default function MyAccountPage() {

  // 🔹 line data per enrollment
  const [lineDataMap, setLineDataMap] = useState<Record<string, any>>({});
  const [lineError, setLineError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== ORDER STATES =====
  const [orders, setOrders] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  /* ======================
     LOAD USER ORDERS
  ======================= */
  useEffect(() => {
    async function loadOrders() {

      const res = await orderByUserAction("sumonklyn@gmail.com");

      if (res.status) {
        setOrders(res.data.groups);
        setSelectedGroup(Object.keys(res.data.groups)[0]);
      }
    }

    loadOrders();
  }, []);

  /* ======================
     LOAD LINE DATA PER ENROLLMENT
  ======================= */
  useEffect(() => {

    async function loadLines() {

      if (!orders || !selectedGroup) return;

      setLoading(true);

      const enrollments =
        Object.keys(orders[selectedGroup] || {});

      const temp: Record<string, any> = {};

      for (const enrollId of enrollments) {
        const result = await lineInquiryAction(enrollId);

        if (result?.status) {
          temp[enrollId] = result.data;
        }
      }

      setLineDataMap(temp);
      setLoading(false);
    }

    loadLines();

  }, [orders, selectedGroup]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow py-10">

        {loading && (
          <div className="text-center text-gray-500">
            Loading account details...
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 grid grid-cols-12 gap-6">

{/* ================================================= */}
{/* USERS / GROUPS */}
{/* ================================================= */}
<div className="col-span-12 md:col-span-3">
  <h6 className="section-title">
    {orders ? "GROUPS" : "USER"}
  </h6>

  <div className="card border-orange">

    {orders && Object.keys(orders).map((group: string) => (
      <div
        key={group}
        onClick={() => setSelectedGroup(group)}
        className={`p-3 rounded mb-2 cursor-pointer border
        ${selectedGroup === group
          ? "border-orange"
          : "border-gray-200"}`}
      >
        {group}
      </div>
    ))}

  </div>
</div>

{/* ================================================= */}
{/* PLAN DETAILS */}
{/* ================================================= */}
<div className="col-span-12 md:col-span-6">
  <h6 className="section-title">PLAN DETAILS</h6>

{orders && selectedGroup &&
  Object.keys(orders[selectedGroup]).map((enrollId: string) => {

    const order = orders[selectedGroup][enrollId][0];
    const lineData = lineDataMap[enrollId];

    return (
      <div key={enrollId} className="card border-orange mb-5">

        <h5 className="font-semibold mb-3">
          Enrollment: {enrollId}
        </h5>

{/* ================= PLAN CARD ================= */}
<div className="card border-orange">

  <div className="flex items-center gap-4 mb-4">
    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
      👤
    </div>

    <div>
      <h5 className="font-semibold">
        {lineData?.LINE_INQ?.MDN || "Customer"}
      </h5>
      <p className="text-xs text-gray-500">
        ESN: {lineData?.ESN || "N/A"}
      </p>
    </div>
  </div>

  <div className="grid grid-cols-3 gap-4 text-center mb-4">

    <div className="stat green">
      <h4>{lineData?.DATA_BALANCE ?? 0} GB</h4>
      <p>Data</p>
    </div>

    <div className="stat purple">
      <h4>{lineData?.TALK_BALANCE ?? 0} min</h4>
      <p>Talk</p>
    </div>

    <div className="stat pink">
      <h4>{lineData?.SMS_BALANCE ?? 0} sms</h4>
      <p>SMS</p>
    </div>

  </div>

  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
    <p>Status:</p>
    <p className="font-medium">
      {lineData?.STATUSCODE || "N/A"}
    </p>

    <p>Reference:</p>
    <p className="font-medium">
      {lineData?.REFERENCENUMBER || "N/A"}
    </p>

    <p>Description:</p>
    <p className="font-medium">
      {lineData?.DESCRIPTION || "N/A"}
    </p>

    <p>Bill:</p>
    <p className="text-orange-600">Download</p>
  </div>

</div>

{/* ================= ORDER PLANS ================= */}
{order.plans.map((plan: any) => (
  <div
    key={plan.planId}
    className="border p-3 rounded mb-2"
  >
    <h6 className="font-semibold">{plan.planTitle}</h6>

    <p className="text-sm text-gray-500">
      {plan.planDuration} Days • {plan.lineType}
    </p>

    <p className="text-orange-600 font-semibold">
      ${plan.planPrice}
    </p>
  </div>
))}

<div className="flex justify-between text-sm mt-3">
  <span>Total</span>
  <span className="font-semibold">
    ${order.total} {order.currency}
  </span>
</div>

<div className="flex gap-3 mt-4">
  <button className="btn-outline flex-1">
    Upgrade Plan
  </button>

  <button className="btn-primary flex-1">
    Pay Bill
  </button>
</div>

      </div>
    );
  })
}

</div>

{/* ================================================= */}
{/* PAYMENT DETAILS */}
{/* ================================================= */}
<div className="col-span-12 md:col-span-3">
  <h6 className="section-title">PAYMENT DETAILS</h6>

  <div className="card">

    <div className="bg-indigo-500 text-white p-4 rounded-lg mb-3">
      <p className="text-sm">Mastercard</p>
      <h5 className="tracking-widest mt-1">
        **** **** **** 5256
      </h5>
      <p className="text-xs mt-2">
        Auto Renew Enabled
      </p>
    </div>

    <button className="btn-outline w-full mb-3">
      Add New Payment Method
    </button>

  </div>
</div>

        </div>
      </main>

      <Footer />

{/* ================= STYLES ================= */}
<style jsx>{`
.section-title{font-size:12px;color:#6b7280;font-weight:600;margin-bottom:8px;}
.card{background:#fff;padding:20px;border-radius:14px;box-shadow:0 2px 10px rgba(0,0,0,.04);}
.border-orange{border:2px solid #ff5a1f;}
.stat{padding:12px;border-radius:12px;color:white;font-weight:600;}
.green{background:#22c55e;}
.purple{background:#8b5cf6;}
.pink{background:#ec4899;}
.btn-primary{background:#ff5a1f;color:white;padding:10px;border-radius:8px;font-weight:600;}
.btn-outline{border:2px solid #ff5a1f;color:#ff5a1f;padding:10px;border-radius:8px;font-weight:600;}
`}</style>

    </div>
  );
}
