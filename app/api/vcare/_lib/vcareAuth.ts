let cachedToken: string | null = null;

export async function getVcareToken(forceRefresh = false) {
  if (cachedToken && !forceRefresh) {
    return cachedToken;
  }

  const res = await fetch("https://www.vcareapi.com:8080/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vendor_id: process.env.VCARE_VENDOR_ID,
      username: process.env.VCARE_USERNAME,
      password: process.env.VCARE_PASSWORD,
      pin: process.env.VCARE_PIN,
    }),
  });
console.log("VCare auth response:", process.env.VCARE_PASSWORD);
  const data = await res.json();

  if (!data?.token) {
    console.error("VCare auth failed:", data);
    throw new Error("VCare authentication failed");
  }

  cachedToken = data.token;
  return cachedToken;
}
