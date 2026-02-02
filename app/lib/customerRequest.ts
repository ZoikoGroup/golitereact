import { callApi } from "./vcareApiCall";

/* -----------------------------------------
 * Line payload (unchanged)
 * ----------------------------------------- */
export type CustomerLine = {
  enrollment_id: string;
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;

  service_address_one: string;
  service_city: string;
  service_state: string;
  service_zip: string;

  billing_address_one: string;
  billing_address_two: string | null;
  billing_state: string;
  billing_city: string;
  billing_zip: string;

  plan_id: number;
  carrier: string;

  is_portin: "Y" | "N";

  port_number: string | null;
  port_current_carrier: string | null;
  port_account_number: string | null;
  port_account_password: string | null;

  port_first_name: string | null;
  port_last_name: string | null;

  port_address_one: string | null;
  port_address_two: string | null;
  port_city: string | null;
  port_state: string | null;
  port_zip_code: string | null;

  pin: string | null;

  enrollment_type: "SHIPMENT";
  is_esim: "Y" | "N";

  parent_enrollment_id: string | null;
};

export type MakeCustomerPayload = {
  lines: CustomerLine[];
};

/* -----------------------------------------
 * API response data (per line)
 * ----------------------------------------- */
export type EsimDetails = {
  ACTIVATION_CODE: string;
  QR_ACTIVATION_CODE: string;
  ICCID: string;
  IS_ESIM: "Y" | "N";
  STATUSCODE: string;
  DESCRIPTION: string;
};

export type CustomerLineResponse = {
  customer_id: number;
  enrollment_id: string;
  mdn: string;
  pin: string;
  esim?: EsimDetails;
};

/* -----------------------------------------
 * callApi wrapper (what vcareApiCall returns)
 * ----------------------------------------- */
interface CallApiWrapper {
  status: boolean;
  http_code: number;
  response: {
    data: { data: CustomerLineResponse }[];
    msg: string;
    msg_code: string;
    token?: string;
  };
}

/* -----------------------------------------
 * Normalized response (LIKE PAYMENT)
 * ----------------------------------------- */
export interface CustomerSuccess {
  status: true;
  msg: string;
  msg_code: string;
  token?: string;
  data: CustomerLineResponse[];
}

export interface CustomerFailure {
  status: false;
  error: string;
  http_code?: number;
  response?: any;
}

export type CustomerResponse =
  | CustomerSuccess
  | CustomerFailure;
/* -----------------------------------------
 * API call (PHP createUser equivalent)
 * ----------------------------------------- */
export async function customerRequest(
  payload: MakeCustomerPayload
): Promise<CustomerResponse> {
  const requestBody = {
    lines: payload.lines,
    action: "create_prepaid_postpaid_customer_v2",
    agent_id: process.env.VCR_AGENT_ID as string,
    source: "WEBSITE",
    request_name: "customer",
  };

  console.log(
    "📡 Customer API request body:",
    JSON.stringify(requestBody, null, 2)
  );

  try {
    const apiResult = (await callApi(
      "/customer",
      "POST",
      requestBody
    )) as CallApiWrapper;

    // 🔍 FULL RAW RESPONSE (no [Object])
    console.log(
      "📡 Customer API RAW response:",
      JSON.stringify(apiResult, null, 2)
    );

    const payload = apiResult?.response;

    if (
      apiResult?.status === true &&
      payload?.msg_code === "RESTAPI000"
    ) {
      // 🔥 Flatten: [{ data: {...} }] → [{...}]
      const lines =
        payload.data?.map(item => item.data) ?? [];

      console.log(
        "📡 Customer API normalized data:",
        JSON.stringify(lines, null, 2)
      );

      return {
        status: true,
        msg: payload.msg,
        msg_code: payload.msg_code,
        token: payload.token,
        data: lines,
      };
    }

    // ❌ Failure path
    return {
      status: false,
      error: payload?.msg ?? "Customer creation failed",
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