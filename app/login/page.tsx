"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const callbackUrl = searchParams.get("callbackUrl") || "/my-account";

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl]);

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
          headers: { "Content-Type": "application/json",
                     "X-Frontend-Origin": window.location.origin, },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "incorrect email or password");
      }

      // ✅ Save token & user
      localStorage.setItem("golite_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = redirect || "/my-account";
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
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
              {(status === "authenticated" || (typeof window !== 'undefined' && !!localStorage.getItem('golite_token'))) ? (
                <button
                  type="button"
                  onClick={() => logout()}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-md bg-white hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl })}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-md bg-white hover:bg-gray-50"
                >
                  Sign in with Google
                </button>
              )}
            </div>

            {/* ===== FACEBOOK LOGIN ===== */}
            <div className="mt-3">
              {(status === "authenticated" || (typeof window !== 'undefined' && !!localStorage.getItem('golite_token'))) ? (
                <button
                  type="button"
                  onClick={() => logout()}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn("facebook", { callbackUrl })}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center py-2 px-4 border rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign in with Facebook
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
