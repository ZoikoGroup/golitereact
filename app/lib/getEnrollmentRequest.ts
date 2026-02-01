import { callApi } from "./vcareApiCall";

interface EnrollmentSuccess {
  status: true;
  enrollment_id: string;
}

interface EnrollmentFailure {
  status: false;
  error?: string;
  http_code?: number;
  response?: any;
}

type EnrollmentResponse = EnrollmentSuccess | EnrollmentFailure;

export async function getEnrollmentRequest(
  zipCode: string
): Promise<EnrollmentResponse> {
  /** ⚠️ TYPE CHECK (important in TS) */
  if (typeof zipCode !== "string") {
    return {
      status: false,
      error: "Invalid zip code type",
    };
  }

  const data = {
    action: "check_service_availability",
    zip_code: zipCode,                 // string
    is_enrollment: "Y" as const,        // literal type
    enrollment_type: "NON_LIFELINE" as const,
    source: "WEBSITE" as const,
    agent_id: process.env.VCR_AGENT_ID as string, // ⚠️ env is string | undefined
  };

  const response = await callApi(
    "/enrollment",
    "POST",
    data
  );
console.log("📡 Enrollment API request data:", data);
  if (response.status && response.response?.data?.enrollment_id) {
    console.log("📡 Enrollment API response:", response);
    return {
      status: true,
      enrollment_id: String(
        response.response.data.enrollment_id
      ), // ⚠️ cast safety
    };
  }

  return {
    status: false,
    error: response.error || "Enrollment request failed",
    http_code: response.http_code,
    response: response.response,
  };
}
