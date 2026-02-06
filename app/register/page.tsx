"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

   // 🔒 Block logged-in users
    useEffect(() => {
      if (isLoggedIn()) {
        window.location.href = "/my-account";
      }
    }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
                     "X-Frontend-Origin": window.location.origin, },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            password,
            password2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // API might return validation errors as object
        if (typeof data === "object") {
          const messages = Object.values(data)
            .flat()
            .join(" | ");
          throw new Error(messages || "Registration failed");
        } else {
          throw new Error(data.message || "Registration failed");
        }
      }

      setSuccess(data.message || "Registration successful!");
      // Optionally redirect after registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      setError(err.message);
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
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
