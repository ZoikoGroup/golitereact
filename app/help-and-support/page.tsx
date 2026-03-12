import { Metadata } from "next";
import HelpSupport from "./HelpSupport";

export const metadata: Metadata = {
  title: "GoLite Mobile Help & Support | Help, FAQs & SIM Support",
  description:
    "GoLite Mobile Help & Support provides assistance with account management, SIM activation, troubleshooting, and direct contact with customer service anytime.",
};

export default function Page() {
  return <HelpSupport />;
}