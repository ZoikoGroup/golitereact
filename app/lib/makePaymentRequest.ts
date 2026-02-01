import { callApi } from "./vcareApiCall";

interface EnrollmentSuccess {
  status: true;
  order_id: string;
  msg: string;
  msg_code: string;
  token: string;
  data: PaymentResponseData;
}

interface EnrollmentFailure {
  status: false;
  error?: string;
  http_code?: number;
  response?: any;
  data?: any[];
}

interface PaymentResponseData {
  coupon_transaction_id: string;
  evad_order_number: string;
  invoice_number: string;
  order_id: string;
  overnight_shipping_amount: string;
  payment_status: string;
  plan_activation_fee: number;
  plan_tax: number;
  processingFee: string;
  total_amount: string;
  total_shipping_amount: number;
  transaction_no: string;
}

export interface MakePaymentPayload {
  enrollment_id: string;
  zip_code: string;
  plan_id: number[];
  billing_state: string;
  billing_city: string;
  billing_zip: string;
  billing_address1: string;
  billing_address2: string;
  no_of_lines: number;
  charge_id: string;
  transaction_id: string;
  action: "make_payment";
  payment_method: string;
  payment_method_option: "STRIPE";
  payment_type: "NEW_SIGNUP";
  source: "API";
  agent_id: string;
}

// ✅ This is what callApi actually returns — a wrapper envelope
interface CallApiWrapper {
  status: boolean;
  http_code: number;
  response: {
    data: PaymentResponseData;
    msg: string;
    msg_code: string;
    token: string;
  };
}

type EnrollmentResponse = EnrollmentSuccess | EnrollmentFailure;

export async function makePaymentRequest(
  paymentData: MakePaymentPayload
): Promise<EnrollmentResponse> {
  if (typeof paymentData.zip_code !== "string") {
    return {
      status: false,
      error: "Invalid zip code type",
    };
  }

  try {
    const apiResult: any = await callApi("/payment", "POST", paymentData);

    // ✅ Unwrap: the actual payload is inside apiResult.response
    const payload = apiResult?.response;

    if (
      apiResult?.status === true &&
      payload?.msg_code === "RESTAPI000" &&
      payload?.data?.payment_status === "SUCCESS"
    ) {
      return {
        status: true,
        order_id: payload.data.order_id,
        msg: payload.msg,
        msg_code: payload.msg_code,
        token: payload.token,
        data: payload.data,
      };
    }

    // Failure path
    return {
      status: false,
      error: payload?.msg ?? "Payment failed",
      http_code: apiResult?.http_code,
      response: apiResult,
      data: payload?.data ? Object.values(payload.data) : [],
    };
  } catch (error) {
    return {
      status: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      response: error,
    };
  }
}