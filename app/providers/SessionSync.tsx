"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function SessionSync() {

  const { data: session, status } = useSession();

  const prevStatusRef = useRef<string>(status);


  useEffect(() => {

    if (status === "loading") {
      prevStatusRef.current = status;
      return;
    }


    const syncSocialUser = async (sessionUser: any) => {

      try {

        // ✅ use .env.local base URL
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/accounts/social-user/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: sessionUser.email,
              first_name: sessionUser.name?.split(" ")[0] || "",
              last_name: sessionUser.name?.split(" ").slice(1).join(" ") || "",
            }),
          }
        );


        if (!res.ok) throw new Error("Social login failed");


        const data = await res.json();


        /**
         * ✅ Store FULL golite user object
         * This allows Header to show user name
         */
        localStorage.setItem("user", JSON.stringify(data.user));


        /**
         * ✅ Store token
         */
        localStorage.setItem("golite_token", data.token);

        localStorage.setItem("golite_accessToken", data.token);


      }

      catch (error) {

        console.error("Social sync failed:", error);

      }

    };



    try {

      if (status === "authenticated" && session?.user) {


        /**
         * ✅ Instant UI update
         */
        localStorage.setItem("user", JSON.stringify({
          name: session.user.name,
          email: session.user.email
        }));

        localStorage.setItem("golite_token", "nextauth");


        /**
         * ✅ Sync real user from backend
         */
        syncSocialUser(session.user);

      }


      else if (status === "unauthenticated") {


        const hasLocalToken =
          typeof window !== "undefined" &&
          (
            !!localStorage.getItem("golite_token") ||
            !!localStorage.getItem("golite_accessToken")
          );


        if (!hasLocalToken || prevStatusRef.current === "authenticated") {

          localStorage.removeItem("user");

          localStorage.removeItem("golite_token");

          localStorage.removeItem("golite_accessToken");

        }

      }

    }

    catch (e) {

      console.error("SessionSync failed:", e);

    }

    finally {

      prevStatusRef.current = status;

    }

  }, [status, session]);


  return null;

}