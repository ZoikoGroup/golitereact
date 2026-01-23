import PrepaidPlansClient from "./PrepaidPlansClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPrepaidPlans() {
  try {
    const res = await fetch(
      `${API_BASE}/api/plans/v1/category/postpaid-plans`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed API status:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Server fetch error:", error);
    return [];
  }
}

export default async function PrepaidPage() {
  const plans = await getPrepaidPlans();

  return <PrepaidPlansClient plans={plans} />;
}
