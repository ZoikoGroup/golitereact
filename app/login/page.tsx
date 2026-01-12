"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

     // 🔒 Block logged-in users
      useEffect(() => {
        if (isLoggedIn()) {
          window.location.href = "/my-account";
        }
      }, []);

  /* =========================
     EMAIL / PASSWORD LOGIN (DJANGO API)
     ========================= */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token & user
      localStorage.setItem("golite_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/my-account";
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GOOGLE OAUTH LOGIN
     ========================= */
  const handleGoogleSignIn = () => {
    setError(null);

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const features = `toolbar=no,menubar=no,width=${width},height=${height},top=${top},left=${left}`;

    const popup = window.open(
      "/api/auth/google?popup=1",
      "golitereact_google_oauth",
      features
    );

    if (!popup) {
      setError("Please allow popups for this site.");
      return;
    }

    setLoading(true);

    const messageHandler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;

      const data: any = e.data;

      if (data?.type === "oauth" && data?.provider === "google") {
        window.removeEventListener("message", messageHandler);
        setLoading(false);

        if (data.success) {
          window.location.reload();
        } else {
          setError(data.error || "Google login failed");
        }
      }
    };

    window.addEventListener("message", messageHandler);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h2>

          {/* ===== LOGIN FORM ===== */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER + FORGOT */}
            <div className="flex justify-between text-sm">
              <Link
                href="/forgot-password"
                className="text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </Link>

              <Link
                href="/register"
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Register
              </Link>
            </div>
          </form>

          {/* ===== DIVIDER ===== */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* ===== GOOGLE LOGIN ===== */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in with Google"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
