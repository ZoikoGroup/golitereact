import { Metadata } from "next";
import Contact from "./BusinessContact";

export const metadata: Metadata = {
  title: "Contact Us | GoLite Mobile Customer Support",
  description:
    "Need assistance from GoLite Mobile? Contact us for support with accounts, billing, and service. Our team is here to provide quick and helpful solutions.",
};

export default function Page() {
  return <Contact />;
}