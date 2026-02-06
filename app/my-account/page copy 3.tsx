"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { lineInquiryAction } from "../actions/lineInquiryAction";
import { orderByUserAction } from "../actions/orderByUserAction";

export default function MyAccountPage() {

  const [lineData, setLineData] = useState<any>(null);
  const [lineError, setLineError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== ORDER STATES =====
  const [orders, setOrders] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  /* ======================
     LOAD LINE INQUIRY
  ======================= */
  useEffect(() => {
    async function loadLine() {
      setLoading(true);

      const result = await lineInquiryAction("WN467");

      if (result.status) {
        setLineData(result.data);
        setLineError(null);
      } else {
        setLineError(result.error || "Failed");
      }

      setLoading(false);
    }

    loadLine();
  }, []);

  /* ======================
     LOAD USER ORDERS
  ======================= */
  useEffect(() => {
    async function loadOrders() {

      // hardcoded email for now
      const res = await orderByUserAction("sumonklyn@gmail.com");

      if (res.status) {
        setOrders(res.data.groups);
        setSelectedGroup(Object.keys(res.data.groups)[0]);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow py-10">

        {/* LOADER */}
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

    {/* ===== GROUP SELECTOR ===== */}
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

    {/* ===== DEFAULT USER CARD ===== */}
    {!orders && (
      <>
        <h5 className="font-semibold mb-1">
          {lineData?.LINE_INQ?.MDN || "Unknown User"}
        </h5>

        <p className="text-sm text-gray-500 mb-4">
          {lineData?.LINE_INQ?.ACCOUNTSTATUS || "Inactive"}
        </p>

        <button className="btn-outline w-full">
          Add Family & Friends
        </button>
      </>
    )}

  </div>
</div>

{/* ================================================= */}
{/* PLAN DETAILS */}
{/* ================================================= */}
<div className="col-span-12 md:col-span-6">
  <h6 className="section-title">PLAN DETAILS</h6>

  {/* ========== NO ORDER (ORIGINAL CARD) ========== */}
  {!orders && (
    
<div className="card border-orange">
    <div className="card card-highlight text-center">
              <div className="flex justify-center mb-5">
                <img
                  src="/img/plan-placeholder.png"
                  alt="Plan"
                  width={260}
                  height={180}
                />
              </div>

              <h5 className="text-lg font-semibold mb-2">
                GET STARTED BY CHOOSING A PLAN
              </h5>
              <p className="card-text mb-6">
                You haven&apos;t selected a plan yet. Purchase a plan to unlock full details and manage your services.
              </p>

              <button className="btn-primary">
                Buy Plan
              </button>
            </div>
            </div>
   )} 

  {/* ========== ORDERS FOUND ========== */}
  {orders && selectedGroup &&
    Object.keys(orders[selectedGroup]).map((enrollId: string) => {

      const order = orders[selectedGroup][enrollId][0];

      return (
        <div
          key={enrollId}
          className="card border-orange mb-5"
        >

          <h5 className="font-semibold mb-3">
            Enrollment: {enrollId}
          </h5>

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

      <div className="flex gap-3">
        <button className="btn-outline flex-1">
          Upgrade Plan
        </button>
        <button className="btn-primary flex-1">
          Pay Bill
        </button>
      </div>

    </div>

          {order.plans.map((plan: any) => (
            <div
              key={plan.planId}
              className="border p-3 rounded mb-2"
            >
              <h6 className="font-semibold">
                {plan.planTitle}
              </h6>

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

    <div className="bg-orange-50 p-3 rounded flex gap-3 items-center">
      <span className="icon-sm">%</span>
      <div>
        <p className="text-sm font-medium text-orange-600">
          30% Off for New Customers
        </p>
        <p className="text-xs text-orange-500">
          View All
        </p>
      </div>
    </div>

  </div>
</div>

{/* ================================================= */}
{/* MANAGE */}
{/* ================================================= */}
<div className="col-span-12">
  <div className="card border-orange">

    <h6 className="section-title mb-4">
      MANAGE EVERYTHING IN ONE PLACE
    </h6>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {[
        "Order Details",
        "Profile Settings",
        "Device Protection",
        "Pay Bills",
      ].map((label) => (
        <div key={label} className="manage-card">
          <div className="text-2xl mb-2">⬤</div>
          <p>{label}</p>
        </div>
      ))}

    </div>

  </div>
</div>

{/* ================================================= */}
{/* REFER & EARN */}
{/* ================================================= */}
<div className="col-span-12 md:col-span-6">

  <div className="card border-orange flex gap-4 items-center">

    <img
      src="/img/pana.png"
      width={110}
      height={110}
      alt="refer"
    />

    <div>
      <h5 className="font-semibold mb-1">
        Share & Save Together!
      </h5>

      <p className="text-sm text-gray-500 mb-3">
        Invite friends and both earn rewards.
      </p>

      <button className="btn-primary">
        Invite & Earn Today
      </button>
    </div>

  </div>

</div>

{/* ================================================= */}
{/* ERROR */}
{/* ================================================= */}
{lineError && (
  <div className="col-span-12 text-center text-red-600">
    {lineError}
  </div>
)}

        </div>
      </main>

      <Footer />

{/* ================================================= */}
{/* STYLES */}
{/* ================================================= */}
<style jsx>{`
.section-title{
  font-size:12px;
  color:#6b7280;
  font-weight:600;
  margin-bottom:8px;
}

.card{
  background:#fff;
  padding:20px;
  border-radius:14px;
  box-shadow:0 2px 10px rgba(0,0,0,.04);
}

.border-orange{
  border:2px solid #ff5a1f;
}

.stat{
  padding:12px;
  border-radius:12px;
  color:white;
  font-weight:600;
}

.green{ background:#22c55e; }
.purple{ background:#8b5cf6; }
.pink{ background:#ec4899; }

.btn-primary{
  background:#ff5a1f;
  color:white;
  padding:10px;
  border-radius:8px;
  font-weight:600;
}

.btn-outline{
  border:2px solid #ff5a1f;
  color:#ff5a1f;
  padding:10px;
  border-radius:8px;
  font-weight:600;
}

.manage-card{
  border:1px solid #e5e7eb;
  padding:18px;
  text-align:center;
  border-radius:10px;
  transition:.2s;
}

.manage-card:hover{
  border-color:#ff5a1f;
  box-shadow:0 4px 12px rgba(0,0,0,.08);
}

.icon-sm{
  width:32px;
  height:32px;
  border-radius:50%;
  background:#ffe4d5;
  color:#ff5a1f;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
}
`}</style>

    </div>
  );
}
