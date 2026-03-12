import type { Metadata } from "next";

const metaData: Record<string, Metadata> = {
  home: {
    title: "GoLite Mobile | Best Mobile Plans USA with Global Coverage",
    description:
      "GoLite Mobile offers the best mobile plans USA with unlimited international calls, 5G data, global coverage & flexible plans.",
  },

  "about-us": {
    title: "About GoLite Mobile | Sustainable Wireless Provider",
    description:
      "Learn about GoLite Mobile’s mission to deliver affordable, transparent wireless service with nationwide coverage.",
  },

  prepaid: {
    title: "Best Prepaid Mobile Plans USA | GoLite Mobile",
    description:
      "Discover the best prepaid mobile plans USA with reliable nationwide 5G coverage and flexible no-contract options.",
  },

  postpaid: {
    title: "Affordable Postpaid Mobile Plans | GoLite Mobile",
    description:
      "Shop GoLite Mobile postpaid plans with unlimited data, hotspot access, and international calling.",
  },

  "shop-family-multi-line-plans": {
    title: "Eco-Friendly Family Phone Plans | GoLite Mobile",
    description:
      "Save with GoLite Mobile family plans offering shared data and unlimited talk & text.",
  },

  business: {
    title: "Affordable Business Mobile Plans | GoLite Mobile",
    description:
      "Business mobile plans designed for teams with flexible lines and nationwide coverage.",
  },

  "community-plans": {
    title: "Affordable Community Mobile Plans | GoLite Mobile",
    description:
      "Mobile plans for students, seniors, veterans and travelers with nationwide coverage.",
  },

  login: {
    title: "Login | GoLite Mobile",
    description:
      "Access your GoLite Mobile account to manage your services and billing.",
  },

  checkout: {
    title: "Secure Checkout | GoLite Mobile",
    description:
      "Complete your GoLite Mobile order securely and activate your plan instantly.",
  },

  "contact-us": {
    title: "Contact GoLite Mobile Support",
    description:
      "Get help from GoLite Mobile support team for billing, plans or activation.",
  },

  "help-and-support": {
    title: "GoLite Mobile Help & Support",
    description:
      "Find FAQs, troubleshooting guides and customer support information.",
  },
};

export function getMetaData(pathname: string): Metadata {
  const page = pathname.replace("/", "") || "home";
  return metaData[page] || metaData["home"];
}