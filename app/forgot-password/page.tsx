"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 🔒 Block logged-in users
  useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/my-account";
    }
  }, []);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/forgot-password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
                     "X-Frontend-Origin": window.location.origin, 
                    },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === "object") {
          const messages = Object.values(data).flat().join(" | ");
          throw new Error(messages || "Failed to send reset email");
        } else {
          throw new Error(data.message || "Failed to send reset email");
        }
      }

      setSuccess(
        data.message ||
          "Password reset link sent! Check your email for instructions."
      );
    } catch (err: any) {
      setError(err.message);
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
            Forgot Your Password?
          </h2>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Enter your email below and we'll send you a link to reset your
            password.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
