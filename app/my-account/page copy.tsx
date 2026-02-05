"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { logout } from "../utils/auth";
import { lineInquiryAction } from "../actions/lineInquiryAction";

type LocalUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
};

export default function MyAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [localUser, setLocalUser] = useState<LocalUser | null>(null);
  const [lineData, setLineData] = useState<any>(null);
  const [lineError, setLineError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD LOCAL USER
  ========================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setLocalUser(JSON.parse(stored));
    }
  }, []);

  /* =========================
     REDIRECT IF NOT LOGGED IN
  ========================= */
  useEffect(() => {
    if (
      status !== "loading" &&
      !session &&
      !localStorage.getItem("golite_token")
    ) {
      router.replace("/login?callbackUrl=/my-account");
    }
  }, [status, session, router]);

  /* =========================
     RESOLVED USER
  ========================= */
  const user = session?.user || localUser;

  /* =========================
     LOAD LINE INQUIRY
  ========================= */
  useEffect(() => {
    if (!user?.email) return;

    async function loadLine() {
      setLoading(true);

      const result = await lineInquiryAction(user.email);

      if (result.status) {
        setLineData(result.data);
        setLineError(null);
      } else {
        setLineError(result.error || "Failed");
      }

      setLoading(false);
    }

    loadLine();
  }, [user]);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/login" });
    } else {
      logout();
      router.replace("/login");
    }
  };

  if (loading || status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Header />

      {/* ================= TOP USER BAR ================= */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <div>
            <h2 className="text-lg font-semibold">
              Welcome, {user?.name || "Customer"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/my-account/update-profile"
              className="btn-outline"
            >
              Update Profile
            </a>

            <button
              onClick={handleLogout}
              className="btn-primary"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      <main className="flex-grow py-8">

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-6">

          {/* ================= USER ================= */}
          <div className="col-span-12 lg:col-span-3">
            <h6 className="section-title">USER</h6>

            <div className="card border-orange text-center">
              <h5 className="font-semibold mb-1">
                {lineData?.LINE_INQ?.MDN || "Unknown User"}
              </h5>

              <p className="text-sm text-gray-500 mb-4">
                {lineData?.LINE_INQ?.ACCOUNTSTATUS || "Inactive"}
              </p>

              <button className="btn-outline w-full">
                Add Family & Friends
              </button>
            </div>
          </div>

          {/* ================= PLAN DETAILS ================= */}
          <div className="col-span-12 lg:col-span-6">
            <h6 className="section-title">PLAN DETAILS</h6>

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
                <p>{lineData?.STATUSCODE || "N/A"}</p>

                <p>Reference:</p>
                <p>{lineData?.REFERENCENUMBER || "N/A"}</p>

                <p>Description:</p>
                <p>{lineData?.DESCRIPTION || "N/A"}</p>

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
          </div>

          {/* ================= PAYMENT ================= */}
          <div className="col-span-12 lg:col-span-3">
            <h6 className="section-title">PAYMENT DETAILS</h6>

            <div className="card">

              <div className="bg-indigo-500 text-white p-4 rounded-lg mb-3">
                <p className="text-sm">Mastercard</p>
                <h5>**** **** **** 5256</h5>
                <p className="text-xs">Auto Renew Enabled</p>
              </div>

              <button className="btn-outline w-full">
                Add New Payment Method
              </button>

            </div>
          </div>

        </div>

        {/* ================= ERROR ================= */}
        {lineError && (
          <div className="text-center text-red-600 mt-6">
            {lineError}
          </div>
        )}

      </main>

      <Footer />

{/* ================= STYLES ================= */}
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
`}</style>

    </div>
  );
}
