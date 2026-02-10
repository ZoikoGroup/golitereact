"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { logout } from "../utils/auth";

import { lineInquiryAction } from "../actions/lineInquiryAction";
import { orderByUserAction } from "../actions/orderByUserAction";

/* ================= TYPES ================= */

type LocalUser = {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  image?: string;
};

export default function MyAccountPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [localUser, setLocalUser] = useState<LocalUser | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [orders, setOrders] = useState<any>({});
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const [lineDataMap, setLineDataMap] = useState<Record<string, any>>({});
  const [lineLoading, setLineLoading] = useState(false);

  /* ================= LOAD LOCAL USER ================= */

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setLocalUser(JSON.parse(stored));
    setPageLoading(false);
  }, []);

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    if (
      status === "authenticated" ||
      localStorage.getItem("golite_token")
    ) return;

    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/my-account");
    }
  }, [status]);

const user: LocalUser | null =
  (session?.user as LocalUser) || localUser;

  /* ================= LOAD ORDERS ================= */

  useEffect(() => {
    if (!user?.email) return;

    async function loadOrders() {
      setOrdersLoading(true);

      try {
        const res = await orderByUserAction(user!.email as string);

        if (res?.status && res?.data?.groups) {
          setOrders(res.data.groups);
          setSelectedGroup(Object.keys(res.data.groups)[0] || null);
        } else {
          setOrders({});
          setSelectedGroup(null);
        }
      } catch {
        setOrders({});
      }

      setOrdersLoading(false);
    }

    loadOrders();
  }, [user?.email]);

  /* ================= LOAD LINE DATA ================= */

  useEffect(() => {
    if (!selectedGroup || !orders[selectedGroup]) return;

    async function loadLines() {
      setLineLoading(true);

      const enrollments = Object.keys(orders[selectedGroup as string]);
      const temp: Record<string, any> = {};

      await Promise.all(
        enrollments.map(async (id) => {
          const res = await lineInquiryAction(id);
          if (res?.status) temp[id] = res.data;
        })
      );

      setLineDataMap(temp);
      setLineLoading(false);
    }

    loadLines();
  }, [selectedGroup, orders]);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/login" });
    } else {
      logout();
      router.replace("/login");
    }
  };

  /* ================= LOADER ================= */

  if (pageLoading || status === "loading") {
    return <div className="loader-screen">Loading account...</div>;
  }

  if (!user) return null;

  /* ================================================= */

  return (
    <div className="page-wrap">

      <Header />

      <main className="content-wrap">

        {/* ================= USER BAR ================= */}
        <div className="w-full bg-[linear-gradient(135deg,#ff5a1f,#ff8a65)] rounded-2xl p-6 mb-8 text-white flex items-center justify-between">

          <div className="user-left">
            <div className="avatar">
              {user?.first_name?.charAt(0) || user?.name ?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>

            <div>
              <h2>
                Welcome, {
                  user?.first_name || user?.name || "User"
                }
              </h2>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="float-end flex flex-row gap-2">
            <button onClick={() => router.push("/my-account/update-profile")} className="bg-transparent border border-white text-white outline-offset-2 outline-sky-500 focus:outline-2 px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-orange-500 transition">
              Update Profile
            </button>
            <button onClick={handleLogout} className="bg-[#ff5a1f] text-white outline-offset-2 outline-sky-500 focus:outline-2 px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-orange-500 transition">
              Logout
            </button>
          </div>

        </div>

        {/* ================= GRID ================= */}

        <div className="grid">

          {/* LEFT */}
          <div>
            <p className="section-title">CUSTOMERS</p>

            <div className="card">

              {ordersLoading && <p className="center">Loading...</p>}

              {!ordersLoading && Object.keys(orders).length === 0 && (
                <p className="center muted">No Plan Found</p>
              )}

              {Object.keys(orders).map((group) => (
                <div
                  key={group}
                  className={`group-item ${selectedGroup === group ? "active" : ""}`}
                  onClick={() => setSelectedGroup(group)}
                >
                  {group}
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div>

            {!ordersLoading && Object.keys(orders).length === 0 && (
              <div className="card highlight center">
                <img src="/img/plan-placeholder.png" width="240" />
                <h3>GET STARTED BY CHOOSING A PLAN</h3>
                <p>Purchase a plan to manage your services.</p>
                <button onClick={() => router.push("/all-plans")} className="bg-[#ff5a1f] text-white outline-offset-2 outline-sky-500 focus:outline-2 px-4 py-2 my-4 rounded-md font-semibold">Buy Plan</button>
              </div>
            )}

            {!ordersLoading &&
              selectedGroup &&
              Object.keys(orders[selectedGroup] || {}).map((id) => {

                const order = orders[selectedGroup][id][0];
                const lineData = lineDataMap[id];

                return (
                  <div key={id} className="card highlight mb">

                    <h4>Enrollment: {id}</h4>

                    <div className="card mb">

                      <div className="line-head">
                        <div className="icon">👤</div>

                        <div>
                          <strong>
                            {lineData?.LINE_INQ?.CARRIER_RESPONSE?.wholeSaleApi?.session?.userName || "Customer"}
                          </strong>
                          <p>ESN: {lineData?.ESN || "N/A"}</p>
                        </div>

                      </div>

                      {lineLoading ? (
                        <p className="center muted">Loading line...</p>
                      ) : (
                        <div className="stats">

                          <div className="stat-box green">
                            <div className="stat-value">
                              {lineData?.DATA_BALANCE ?? 0} GB
                            </div>
                            <div className="stat-sub">used of 1.5 GB</div>
                            <div className="stat-label">HIGH SPEED 5G DATA</div>
                          </div>

                          <div className="stat-box purple">
                            <div className="stat-value">
                              {lineData?.TALK_BALANCE ?? 0} Min
                            </div>
                            <div className="stat-sub">used of 8000 min</div>
                            <div className="stat-label">CALLING MINUTES</div>
                          </div>

                          <div className="stat-box pink">
                            <div className="stat-value">
                              {lineData?.SMS_BALANCE ?? 0} SMS
                            </div>
                            <div className="stat-sub">used of 4000 SMS</div>
                            <div className="stat-label">SMS</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {order.plans.map((plan: any) => (
                      <div key={plan.planId} className="plan-row">
                        <strong>{plan.planTitle}</strong>
                        <p>{plan.planDuration} Days • {plan.lineType}</p>
                        <span>${plan.planPrice}</span>
                      </div>
                    ))}

                    <div className="total-row">
                      <span>Total</span>
                      <strong>${order.total}</strong>
                    </div>

                    <div className="actions">
                      <button className="btn-outline">Upgrade</button>
                      <button className="btn-primary">Pay Bill</button>
                    </div>

                  </div>
                );
              })}

          </div>

        </div>

      </main>

      <Footer />

{/* ================= STYLES ================= */}

<style jsx>{`

.page-wrap{
  min-height:100vh;
  background:linear-gradient(180deg,#fff7f2,#f9fafb);
}

.content-wrap{
  max-width:1280px;
  margin:auto;
  padding:40px 16px;
}

.loader-screen{
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  font-weight:600;
}

/* USER BAR */

.user-bar{
  background:linear-gradient(135deg,#ff5a1f,#ff8a65);
  border-radius:22px;
  padding:26px 30px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-shadow:0 20px 40px rgba(255,90,31,.35);
  margin-bottom:30px;
}

.user-left{
  display:flex;
  align-items:center;
  gap:18px;
  color:white;
}

.avatar{
  width:60px;
  height:60px;
  border-radius:50%;
  background:rgba(255,255,255,.25);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:26px;
  font-weight:700;
}

.user-actions{
  display:flex;
  gap:14px;
}

/* GRID */

.grid{
  display:grid;
  grid-template-columns:280px 1fr;
  gap:26px;
}

/* CARD */

.card{
  background:white;
  padding:22px;
  border-radius:18px;
  box-shadow:0 6px 25px rgba(0,0,0,.05);
}

.highlight{
  border:2px solid #ff5a1f;
}

.mb{margin-bottom:22px;}
.center{text-align:center;}
.muted{color:#6b7280;}

.section-title{
  font-size:12px;
  font-weight:700;
  letter-spacing:.12em;
  color:#9ca3af;
  margin-bottom:10px;
}

/* GROUP */

.group-item{
  padding:12px;
  border-radius:12px;
  margin-bottom:10px;
  cursor:pointer;
  background:#f9fafb;
  font-weight:600;
}

.group-item.active{
  background:#ffefe7;
  color:#ff5a1f;
}

/* LINE */

.line-head{
  display:flex;
  gap:14px;
  align-items:center;
  margin-bottom:14px;
}

.icon{
  width:46px;
  height:46px;
  border-radius:50%;
  background:linear-gradient(135deg,#ff5a1f,#ff8a65);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* STATS */

.stats{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}

.stat{
  color:white;
  padding:14px;
  border-radius:14px;
  font-weight:700;
  text-align:center;
}

.green{background:#22c55e;}
.purple{background:#8b5cf6;}
.pink{background:#ec4899;}

/* PLANS */

.plan-row{
  border:1px solid #e5e7eb;
  padding:14px;
  border-radius:14px;
  margin-bottom:12px;
  display:flex;
  justify-content:space-between;
}

.plan-row span{
  color:#ff5a1f;
  font-weight:700;
}

/* TOTAL */

.total-row{
  display:flex;
  justify-content:space-between;
  font-weight:700;
  margin-top:12px;
}

/* BUTTONS */

.actions{
  display:flex;
  gap:12px;
  margin-top:18px;
}

.btn-primary{
  background:#ff5a1f;
  color:white;
  padding:12px;
  border-radius:12px;
  font-weight:700;
  flex:1;
}

.btn-outline{
  border:2px solid #ff5a1f;
  color:#ff5a1f;
  padding:12px;
  border-radius:12px;
  font-weight:700;
  flex:1;
}

/* MOBILE */

@media(max-width:900px){
  .grid{
    grid-template-columns:1fr;
  }

  .user-bar{
    flex-direction:column;
    gap:18px;
    align-items:flex-start;
  }

  .user-actions{
    width:100%;
  }
}

.stats{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}

.stat-box{
  background:#f9fafb;
  border-radius:16px;
  padding:16px;
  text-align:center;
}

.stat-value{
  font-size:22px;
  font-weight:800;
  margin-bottom:4px;
}

.stat-sub{
  font-size:12px;
  color:#6b7280;
  margin-bottom:6px;
}

.stat-label{
  font-size:12px;
  font-weight:700;
}

/* Colors */
.green .stat-value{color:#16a34a;}
.purple .stat-value{color:#7c3aed;}
.pink .stat-value{color:#db2777;}


`}</style>

    </div>
  );
}
