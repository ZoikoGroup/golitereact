import { Metadata } from "next";
import PsimActivate from "./PsimActivate";

export const metadata: Metadata = {
  title: "GoLite Mobile pSIM Activation | Easy Online Process",
  description:
    "Activate your GoLite Mobile pSIM card online today. Get connected in minutes with our easy step-by-step instructions for seamless mobile service.",
};

export default function Page() {
  return <PsimActivate />;
}