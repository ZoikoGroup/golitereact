"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const prevStatusRef = useRef<string>(status);

  useEffect(() => {
    // Avoid overwriting/clearing localStorage during transient 'loading' states
    if (status === "loading") {
      prevStatusRef.current = status;
      return;
    }

    try {
      if (status === "authenticated" && session?.user) {
        localStorage.setItem("user", JSON.stringify(session.user));
        // placeholder token so existing auth checks work
        localStorage.setItem("golite_token", "nextauth");
      } else if (status === "unauthenticated") {
        // If a local token already exists, don't clear it on transient unauthenticated states
        const hasLocalToken =
          typeof window !== "undefined" &&
          (!!localStorage.getItem("golite_token") || !!localStorage.getItem("golite_accessToken"));

        // Only clear storage if we transitioned from an authenticated state (explicit sign-out)
        // or if no local token is present at all
        if (!hasLocalToken || prevStatusRef.current === "authenticated") {
          localStorage.removeItem("user");
          localStorage.removeItem("golite_token");
        }
      }
    } catch (e) {
      console.error("SessionSync failed to update localStorage", e);
    } finally {
      prevStatusRef.current = status;
    }
  }, [status, session]);

  return null;
}
