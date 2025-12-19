"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleGoogleSignIn = () => {
    setError(null);
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const features = `toolbar=no,menubar=no,width=${width},height=${height},top=${top},left=${left}`;

    // Open the OAuth endpoint in a popup. Server should support popup flow and postMessage back to opener.
    const popup = window.open("/api/auth/google?popup=1", "golitereact_google_oauth", features);
    if (!popup) {
      setError("Unable to open popup. Please allow popups for this site.");
      return;
    }

    setLoading(true);

    const cleanup = () => {
      try {
        window.removeEventListener("message", messageHandler);
      } catch (e) {}
      clearInterval(poll);
      setLoading(false);
    };

    // Listen for postMessage from the popup. The popup (server redirect page) should call:
    // window.opener.postMessage({ type: 'oauth', provider: 'google', success: true }, window.origin)
    const messageHandler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data as any;
      if (data?.type === "oauth" && data?.provider === "google") {
        cleanup();
        if (data.success) {
          // Successful sign-in; refresh or navigate to authenticated area
          window.location.reload();
        } else {
          setError(data.error || "Authentication failed");
        }
      }
    };

    window.addEventListener("message", messageHandler);

    // Fallback: poll for popup closed and then check session server-side
    const poll = setInterval(() => {
      if (popup.closed) {
        clearInterval(poll);
        window.removeEventListener("message", messageHandler);
        // Check session endpoint to see if login succeeded
        fetch("/api/auth/session")
          .then((res) => res.json())
          .then((data) => {
            if (data?.user) {
              window.location.reload();
            } else {
              setLoading(false);
              setError("Popup closed before completing sign-in.");
            }
          })
          .catch(() => {
            setLoading(false);
            setError("Unable to verify authentication status.");
          });
      }
    }, 500);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Login
              </button>
            </div>
          </form>
          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-60"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 6.7 1.7 8.2 3.1l6-5.8C35.6 3.6 30.2 1.5 24 1.5 14.7 1.5 6.9 6.9 3.3 14.7l7.4 5.7C12.8 15.2 18 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h12.8c-.5 2.8-2 5.2-4.2 6.8l6.6 5.1C43.9 37 46.5 31.3 46.5 24.5z"/>
                  <path fill="#4A90E2" d="M10.7 29.9c-.8-2.3-1.2-4.7-1.2-7.1s.4-4.8 1.2-7.1L3.3 9.9C1.2 13.9 0 18.6 0 24s1.2 10.1 3.3 14.1l7.4-8.2z"/>
                  <path fill="#FBBC05" d="M24 46.5c6.2 0 11.6-2.1 15.7-5.7l-7.4-5.7c-2 1.4-4.5 2.3-8.3 2.3-6 0-11.2-5.7-12.9-13.6L3.3 33.9C6.9 41.7 14.7 46.5 24 46.5z"/>
                </svg>
                {loading ? "Signing in..." : "Sign in with Google"}
              </button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}