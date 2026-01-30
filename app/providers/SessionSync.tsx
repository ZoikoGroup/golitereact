"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SessionSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    try {
      if (status === "authenticated" && session?.user) {
        localStorage.setItem("user", JSON.stringify(session.user));
        // placeholder token so existing auth checks work
        localStorage.setItem("golite_token", "nextauth");
      } else if (status === "unauthenticated") {
        localStorage.removeItem("user");
        localStorage.removeItem("golite_token");
      }
    } catch (e) {
      console.error("SessionSync failed to update localStorage", e);
    }
  }, [status, session]);

  return null;
}
