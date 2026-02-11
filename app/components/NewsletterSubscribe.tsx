"use client";

import React, { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://goliteapi.golitemobile.com";

const NEWSLETTER_API = `${API_BASE_URL}/api/newsletter/subscribe/`;

const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Proper email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();

    // Validation
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(NEWSLETTER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Subscription failed. Please try again."
        );
      }

      setSuccess("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FORM ROW */}
      <div className="form-row">
        <input
          type="email"
          className="sub-input dark:bg-gray-700"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          className="sub-btn"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {/* MESSAGES */}
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* PRIVACY TEXT */}
      <p className="dark:text-gray-100 mt-2">
        Your privacy matters! GoLite only uses this info to send content and
        updates. You may unsubscribe anytime.
      </p>
    </>
  );
};

export default NewsletterSubscribe;
