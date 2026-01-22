"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type PageProps = {
  params: Promise<{
    uid: string;
    token: string;
  }>;
};

export default function ResetPasswordPage({ params }: PageProps) {
  // ✅ REQUIRED FIX (unwrap params)
  const { uid, token } = use(params);

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/reset-password/${uid}/${token}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            password2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === "object") {
          const messages = Object.values(data).flat().join(" | ");
          throw new Error(messages || "Reset failed");
        }
        throw new Error("Reset failed");
      }

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
