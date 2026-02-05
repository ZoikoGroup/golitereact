import { callApi } from "./vcareApiCall";

/* ---------------- TYPES ---------------- */

export interface LineInquirySuccess {
  status: true;
  data: any;
}

export interface LineInquiryFailure {
  status: false;
  error?: string;
  http_code?: number;
  response?: any;
}

export type LineInquiryResponse =
  | LineInquirySuccess
  | LineInquiryFailure;

/* ---------------- API ---------------- */

export async function lineInquiry(
  enrollmentId: string
): Promise<LineInquiryResponse> {

  if (!enrollmentId) {
    return {
      status: false,
      error: "Enrollment id required",
    };
  }

  const payload = {
    enrollment_id: enrollmentId,
    action: "line_inquiry",
    agent_id: process.env.VCR_AGENT_ID as string,
    source: "API",
  };

  console.log("📡 Line Inquiry Request:", payload);

  try {
    const response = await callApi(
      "/customer",
      "POST",
      payload
    );

    console.log("📡 Line Inquiry Response:", response);

    if (response.status && response.response?.data) {
      return {
        status: true,
        data: response.response.data,
      };
    }

    return {
      status: false,
      error: response.error || "Line inquiry failed",
      http_code: response.http_code,
      response: response.response,
    };

  } catch (err) {
    return {
      status: false,
      error:
        err instanceof Error
          ? err.message
          : "Unexpected error",
    };
  }
}
