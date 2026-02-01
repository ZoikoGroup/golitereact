// lib/customerRequest.ts
import { callApi } from "./vcareApiCall";

/* -----------------------------------------
 * Line payload (one per plan)
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

/* -----------------------------------------
 * Request payload
 * ----------------------------------------- */
export type MakeCustomerPayload = {
  lines: CustomerLine[];
};

/* -----------------------------------------
 * API response types
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

export type CustomerApiResponse = {
  data: {
    data: CustomerLineResponse;
  }[];
  msg: string;
  msg_code: string;
  token?: string;
};

/* -----------------------------------------
 * API call (PHP createUser equivalent)
 * ----------------------------------------- */
export async function customerRequest(
  payload: MakeCustomerPayload
): Promise<CustomerApiResponse> {
  const requestBody = {
    lines: payload.lines,
    action: "create_prepaid_postpaid_customer_v2",
    agent_id: process.env.VCR_AGENT_ID as string,
    source: "WEBSITE",
    request_name: "customer",
  };

  console.log("📡 Customer API request body:", requestBody);

  const response = await callApi(
    "/customer",
    "POST",
    requestBody
  );

  console.log("📡 Customer API response:", response);

  // Map the API response to the expected CustomerApiResponse shape
  if (
    response &&
    response.status === true &&
    response.response &&
    Array.isArray(response.response.data)
  ) {
    return {
      data: response.response.data,
      msg: response.response.msg ?? "",
      msg_code: response.response.msg_code ?? "",
      token: response.response.token,
    };
  } else {
    // Return a default error shape if the response is not as expected
    return {
      data: [],
      msg: response?.error ?? "Unknown error",
      msg_code: "",
    };
  }
}
