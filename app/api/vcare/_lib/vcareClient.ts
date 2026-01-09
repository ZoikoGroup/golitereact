import { getVcareToken } from "./vcareAuth";

export async function vcareFetch(endpoint: string, body: any) {
  const token = await getVcareToken();

  if (!token) {
    throw new Error("VCare token missing");
  }

  let res = await fetch(`https://www.vcareapi.com:8080/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token, // ✅ now string only
    },
    body: JSON.stringify(body),
  });

  let data = await res.json();

  // 🔁 Retry once if token expired
  if (data?.msg_code === "RESTAPI001") {
    const newToken = await getVcareToken(true);

    if (!newToken) {
      throw new Error("VCare token refresh failed");
    }

    res = await fetch(`https://www.vcareapi.com:8080/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: newToken,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  }

  return data;
}
