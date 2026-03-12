import { Metadata } from "next";
import FamilyPlans from "./FamilyPlans";

export const metadata: Metadata = {
  title: "Eco-Friendly Family Phone Plans | GoLite Mobile",
  description:
    "Save on eco-friendly GoLite Mobile family phone plans with shared data, unlimited talk & text, flexible lines, and budget-friendly pricing for families.",
};

export default function Page() {
  return <FamilyPlans />;
}