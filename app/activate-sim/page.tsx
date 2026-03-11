import type { Metadata } from "next";
import SimComparisonClient from "./SimComparisonClient";

export const metadata: Metadata = {
  title: "GoLite Mobile SIM Activation | Fast Mobile Connectivity",
  description:
    "Activate your GoLite Mobile SIM card easily online. Enjoy seamless mobile service and start using your number without delays with our step-by-step guide.",
};

export default function Page() {
  return <SimComparisonClient />;
}