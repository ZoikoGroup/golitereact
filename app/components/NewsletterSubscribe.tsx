"use client";

import React, { useState } from "react";

const NEWSLETTER_API =
  "https://goliteapi.golitemobile.com/api/newsletter/subscribe/";

const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    if (!email) {
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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Subscription failed");
      }

      setSuccess("✅ Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
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
