import { Metadata } from "next";
import SpecialPlans from "./SpecialPlans";

export const metadata: Metadata = {
  title: "Affordable Community Mobile Plans | GoLite Mobile",
  description:
    "GoLite Mobile community mobile plans offer affordable prepaid options with nationwide coverage, and perks for travelers, students, seniors, veterans and more.",
};

export default function Page() {
  return <SpecialPlans />;
}