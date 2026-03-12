import { Metadata } from "next";
import Career from "./Career";

export const metadata: Metadata = {
  title: "Careers at GoLite Mobile | Join Our Innovative Team",
  description:
    "Explore careers at GoLite Mobile. Join our innovative team, grow your skills, and help shape the future of mobile technology and customer experiences.",
};

export default function Page() {
  return <Career />;
}