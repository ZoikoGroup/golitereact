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
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/login/`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    // ✅ SAFELY read response
    const text = await response.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Server returned non-JSON:", text);
      throw new Error("Server error. Check API URL or CORS.");
    }

    if (!response.ok) {
      throw new Error(data?.message || "Incorrect email or password");
    }

    // ✅ save
    localStorage.setItem("golite_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.replace(redirect || "/my-account");

  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center dark:bg-gray-900 bg-gray-100 py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
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
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7 19-20 0-1.3-.1-2.7-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.1C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.4-11.2-8.1l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-2.9 5-5.3 6.6l6.2 5.1C40.9 36.6 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                  </svg> &nbsp;
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.5 3.4-3.5.98 0 2 .18 2 .18v2.2h-1.13c-1.1 0-1.45.69-1.45 1.4V12h2.46l-.39 2.9h-2.07v7A10 10 0 0022 12z"/>
                  </svg>&nbsp;
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
