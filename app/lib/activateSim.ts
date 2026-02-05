import { callApi } from "./vcareApiCall"; // adjust path if needed

export async function activateSim(payload: {
  enrollmentId: string;
  imeiNumber: string;
  simSerialNumber: string;
  zipCode: string;
}) {
  try {
    const data = {
      action: "new_number_activation_with_zip_code",
      enrollment_id: payload.enrollmentId,
      sim: payload.simSerialNumber,
      imei: payload.imeiNumber,
      zip_code: payload.zipCode,
      agent_id: process.env.TELGOO_AGENT_ID,
      source: "API",
    };

    console.log("📡 Activation request:", data);

    const response = await callApi("inventory", "POST", data);

    return response;

  } catch (error) {
    console.error("activateSim error:", error);

    return {
      status: false,
      error: "Activation API failed",
    };
  }
}
