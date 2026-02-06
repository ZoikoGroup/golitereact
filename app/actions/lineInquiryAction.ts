"use server";

import { lineInquiry } from "@/app/lib/lineInquiryApi";

export async function lineInquiryAction(
  enrollmentId: string
) {
  return await lineInquiry(enrollmentId);
}
