let cachedToken: string | null = null;
let expiresAt = 0;

export async function getAuthToken(): Promise<string | null> {

  const res = await fetch(`${process.env.VCR_API_BASE}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vendor_id: process.env.VCARE_VENDOR_ID,
      username: process.env.VCARE_USERNAME,
      password: process.env.VCARE_PASSWORD,
      pin: process.env.VCARE_PIN,
    }),
  });

  if (!res.ok) {
    console.error("Generate token failed", await res.text());
    return null;
  }

  const data = await res.json();

  return data.token ?? null;
}
