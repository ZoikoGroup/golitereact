import type { Metadata } from "next";
import AllPlans from "./AllPlans";

export const metadata: Metadata = {
  title: "Best Value Mobile Plans & Pricing | GoLite Mobile",
  description:
    "Looking for the best value mobile plans? GoLite Mobile offers affordable, flexible plans with fast nationwide coverage. Compare all plans and save now.",
};

export default function Page() {
  return <AllPlans />;
}