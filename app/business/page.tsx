import BusinessPlansClient from "./BusinessPlansClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getBusinessPlans() {
  try {
    const res = await fetch(
      `${API_BASE}/api/plans/v1/category/business-plans`,
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

export default async function BusinessPage() {
  const plans = await getBusinessPlans();

  return <BusinessPlansClient plans={plans} />;
}
