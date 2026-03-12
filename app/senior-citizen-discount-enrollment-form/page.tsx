import { Metadata } from "next";
import SeniorCitizen from "./SeniorCitizen";

export const metadata: Metadata = {
  title: "Senior Citizen Discount Enrollment | GoLite Mobile",
  description:
    "GoLite Mobile offers special senior citizen discounts. Apply online through the enrollment form and start enjoying reduced rates on calls, texts, and data.",
};

export default function Page() {
  return <SeniorCitizen />;
}