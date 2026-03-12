import { Metadata } from "next";
import StudentDiscount from "./StudentDiscount";

export const metadata: Metadata = {
  title: "Student Discount Application Form | GoLite Mobile",
  description:
    "Apply for the GoLite Mobile student discount online and start saving on your mobile plan with exclusive student pricing and affordable data options today.",
};

export default function Page() {
  return <StudentDiscount />;
}