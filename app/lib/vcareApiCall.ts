import { getAuthToken } from "./vcareAuth";

export async function callApi(
  endpoint: string,
  method: string = "GET",
  data: any = null,
  isAuthAPI: boolean = false
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!isAuthAPI) {
    const token = await getAuthToken();
    console.log("VCare Auth Token:", token);
    if (!token) {
      return {
        status: false,
        error: "Generate token failed",
        http_code: 401,
        response: null,
      };
    }
    headers["token"] = token; // 🔥 SAME AS PHP
  }

  const res = await fetch(`${process.env.VCR_API_BASE}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  const text = await res.text();
  const parsed = (() => {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  })();

  if (!res.ok) {
    return {
      status: false,
      error: "API error",
      http_code: res.status,
      response: parsed,
    };
  }

  return {
    status: true,
    http_code: res.status,
    response: parsed,
  };
}
