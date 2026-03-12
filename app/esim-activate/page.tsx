import { Metadata } from "next";
import EsimActivate from "./EsimActivate";

export const metadata: Metadata = {
  title: "GoLite Mobile eSIM Activation | Quick and Easy Setup",
  description:
    "Quickly activate your GoLite Mobile eSIM card online. Follow easy steps to set up your digital SIM and start calling, texting, and using data instantly.",
};

export default function Page() {
  return <EsimActivate />;
}