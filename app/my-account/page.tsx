"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function MyAccountPage() {
  const [user, setUser] = useState<any>(null);

  // 🔐 AUTH CHECK
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("golite_token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        return;
      }

      // If no local token/user, try NextAuth session (popup or redirect flows)
      try {
        const res = await fetch('/api/auth/session', { credentials: 'same-origin' });
        if (res.ok) {
          const session = await res.json();
          if (session?.user) {
            // Populate localStorage so other code paths that expect `golite_token` work
            localStorage.setItem('user', JSON.stringify(session.user));
            localStorage.setItem('golite_token', 'nextauth');
            setUser(session.user);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to read NextAuth session', e);
      }

      window.location.href = "/login";
      return;
    })();
  }, []);

  // 🚪 LOGOUT
  const handleLogout = async () => {
    const token = localStorage.getItem("golite_token");

    try {
      if (token) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/logout/`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("golite_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9]">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 grid col-span-12 gap-6">
            {/* ================= WELCOME BAR (ADDED) ================= */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Welcome,&nbsp;
                      {user?.first_name || user?.last_name
                        ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
                        : user?.username}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Email: {user?.email}
                    </p>
                  </div>

                  <a
                    href="my-account/update-profile"
                    className="text-orange-600 font-medium hover:underline"
                  >
                    Update Profile
                  </a>

                  <button
                    onClick={handleLogout}
                    className="btn-outline w-fit"
                  >
                    Logout
                  </button>
                </div>
            </div>
      
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-6">

          

          {/* ================= USERS ================= */}
          <div className="col-span-12 lg:col-span-3">
            <h4 className="section-title">USERS</h4>

            <div className="card text-center">
              <div className="icon-circle mb-3">
                <span className="text-xl">+</span>
              </div>

              <h5 className="card-title">Add Family & Friends</h5>
              <p className="card-text">
                Link numbers of your family and friends for discounts & bill
                payments.
              </p>
            </div>
          </div>

          {/* ================= PLAN DETAILS ================= */}
          <div className="col-span-12 lg:col-span-6">
            <h4 className="section-title">PLAN DETAILS</h4>

            <div className="card card-highlight text-center">
              <div className="flex justify-center mb-5">
                <Image
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
                You haven’t selected a plan yet. Purchase a plan to unlock full
                details and manage your services.
              </p>

              <button className="btn-primary">
                Buy Plan
              </button>
            </div>

            {/* ================= MANAGE ================= */}
          <div className="col-span-12 lg:col-span-9 py-8">
            <div className="card card-highlight">
              <h4 className="section-title mb-4">
                MANAGE EVERYTHING IN ONE PLACE
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Order Details", icon: "🛒" },
                  { label: "Profile Settings", icon: "👤" },
                  { label: "Device Protection Plan", icon: "🛡️" },
                  { label: "Pay Bills", icon: "🧾" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="manage-card"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= REFER & EARN ================= */}
          <div className="col-span-12 lg:col-span-6">
            <div className="card card-highlight flex gap-4 items-center">
              <Image
                src="/img/pana.png"
                alt="Refer"
                width={120}
                height={120}
              />

              <div>
                <h5 className="font-semibold mb-1">
                  Share & Save Together!
                </h5>
                <p className="card-text mb-3">
                  Invite your friends to join and enjoy exclusive rewards. The
                  more you refer, the more you earn.
                </p>
                <button className="btn-primary">
                  Invite & Earn Today
                </button>
              </div>
            </div>
          </div>
          </div>

          {/* ================= PAYMENT DETAILS ================= */}
          <div className="col-span-12 lg:col-span-3">
            <h4 className="section-title">PAYMENT DETAILS</h4>

            <div className="card text-center mb-4">
              <div className="flex justify-center mb-3">
                <Image
                  src="/img/refer-placeholder.png"
                  alt="Payment"
                  width={120}
                  height={120}
                />
              </div>

              <button className="btn-outline mb-2">
                Add New Payment Method
              </button>

              <p className="text-xs text-gray-400">
                Learn more about payment methods we accept
              </p>
            </div>

            <div className="card">
              <h5 className="text-sm font-semibold mb-3">
                DISCOUNT & OFFERS
              </h5>

              <div className="flex items-center gap-3 bg-[#fff4ee] p-3 rounded-md">
                <div className="icon-circle-sm">
                  %
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    30% Off for New Customers
                  </p>
                  <span className="text-xs text-orange-500 cursor-pointer">
                    View All
                  </span>
                </div>
              </div>
            </div>
          </div>

          

        </div>
      </main>

      <Footer />

      {/* ================= INLINE CSS (DESIGN ACCURACY) ================= */}
      <style jsx>{`
        .section-title {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }

        .card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .card-highlight {
          border: 2px solid #ff5a1f;
        }

        .card-title {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .card-text {
          font-size: 14px;
          color: #6b7280;
        }

        .icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fff4ee;
          color: #ff5a1f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          font-weight: bold;
        }

        .icon-circle-sm {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffe6db;
          color: #ff5a1f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
        }

        .btn-primary {
          background: #ff5a1f;
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .btn-primary:hover {
          background: #e14c15;
        }

        .btn-outline {
          border: 1.5px solid #ff5a1f;
          color: #ff5a1f;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .manage-card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .manage-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #ff5a1f;
        }
      `}</style>
    </div>
  );
}
