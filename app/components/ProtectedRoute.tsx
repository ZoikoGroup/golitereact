"use client";

import { useEffect } from "react";
import { isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);

  return <>{children}</>;
}
