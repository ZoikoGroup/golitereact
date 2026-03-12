import { Metadata } from "next";
import Checkout from "./Checkout";

export const metadata: Metadata = {
  title: "GoLite Mobile Checkout | Secure & Fast Order Completion",
  description:
    "Securely complete your GoLite Mobile order with our fast checkout. Activate your prepaid plan in minutes and enjoy reliable nationwide coverage today.",
};

export default function Page() {
  return <Checkout />;
}