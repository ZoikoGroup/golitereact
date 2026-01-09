import { getVcareToken } from "./vcareAuth";

export async function vcareFetch(endpoint: string, body: any) {
  let token = await getVcareToken();

  let res = await fetch(`https://www.vcareapi.com:8080/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
    body: JSON.stringify(body),
  });

  let data = await res.json();

  // 🔁 Token invalid → re-auth once
  if (data?.msg_code === "RESTAPI001") {
    token = await getVcareToken(true);

    res = await fetch(`https://www.vcareapi.com:8080/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  }

  return data;
}
