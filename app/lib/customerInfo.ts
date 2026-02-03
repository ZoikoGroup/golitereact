import { callApi } from "./vcareApiCall";

/* -----------------------------------------
 * API response data (per line)
 * ----------------------------------------- */
export type CustomerInfoLine = {
  enrollment_id: string;
  esn_number: string | null;
  plan_description: string;
  is_esim: "Y" | "N";
};

/* -----------------------------------------
 * callApi wrapper (what vcareApiCall returns)
 * ----------------------------------------- */
interface CallApiWrapper {
  status: boolean;
  http_code: number;
  response: {
    data: CustomerInfoLine[];
    msg: string;
    msg_code: string;
    token?: string;
  };
}

/* -----------------------------------------
 * Normalized response (LIKE customerRequest)
 * ----------------------------------------- */
export interface CustomerInfoSuccess {
  status: true;
  msg: string;
  msg_code: string;
  token?: string;
  data: CustomerInfoLine[];
}

export interface CustomerInfoFailure {
  status: false;
  error: string;
  http_code?: number;
  response?: any;
}

export type CustomerInfoResponse =
  | CustomerInfoSuccess
  | CustomerInfoFailure;

/* -----------------------------------------
 * API call (customer_info)
 * ----------------------------------------- */
export async function customerInfo(
  email: string
): Promise<CustomerInfoResponse> {
  const requestBody = {
    email,
    action: "customer_info",
    agent_id: process.env.VCR_AGENT_ID as string,
    source: "WEBSITE",
    request_name: "customer",
  };

  console.log(
    "📡 Customer INFO API request body:",
    JSON.stringify(requestBody, null, 2)
  );

  try {
    const apiResult = (await callApi(
      "/customer",
      "POST",
      requestBody
    )) as CallApiWrapper;

    // 🔍 FULL RAW RESPONSE
    console.log(
      "📡 Customer INFO API RAW response:",
      JSON.stringify(apiResult, null, 2)
    );

    const payload = apiResult?.response;

    if (
      apiResult?.status === true &&
      payload?.msg_code === "RESTAPI000"
    ) {
      console.log(
        "📡 Customer INFO normalized data:",
        JSON.stringify(payload.data, null, 2)
      );

      return {
        status: true,
        msg: payload.msg,
        msg_code: payload.msg_code,
        token: payload.token,
        data: payload.data,
      };
    }

    // ❌ Failure path
    return {
      status: false,
      error: payload?.msg ?? "Customer info fetch failed",
      http_code: apiResult?.http_code,
      response: apiResult,
    };
  } catch (error) {
    return {
      status: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error",
      response: error,
    };
  }
}
