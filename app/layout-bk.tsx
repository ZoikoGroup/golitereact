import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================================
   ALL WEBSITE META DATA HERE
================================ */

const pageMeta: Record<string, Metadata> = {
  "/": {
    title: "GoLite Mobile | Best Mobile Plans USA with Global Coverage",
    description:
      "GoLite Mobile offers the best mobile plans in the USA with unlimited international calls, 5G data, global coverage & flexible plans for every user’s needs.",
  },

  "/about-us": {
    title: "About GoLite Mobile | Sustainable Wireless Provider",
    description:
      "Learn about GoLite Mobile’s mission to deliver affordable, transparent wireless service with nationwide coverage and a commitment to sustainability.",
  },

  "/prepaid": {
    title: "Best Prepaid Mobile Plans USA | GoLite Mobile",
    description:
      "Discover the best prepaid mobile plans USA at GoLite Mobile with reliable nationwide 5G coverage, transparent pricing, and flexible no-contract options.",
  },

  "/postpaid": {
    title: "Affordable Postpaid Mobile Plans | GoLite Mobile",
    description:
      "Shop GoLite Mobile postpaid mobile plans for unlimited data, high-speed 5G, hotspot access, and international calls included—plans for every lifestyle.",
  },

  "/family-plans": {
    title: "Eco-Friendly Family Phone Plans | GoLite Mobile",
    description:
      "Save on eco-friendly GoLite Mobile family phone plans with shared data, unlimited talk & text, flexible lines, and budget-friendly pricing for families.",
  },

  "/business": {
    title: "Affordable Business Mobile Phone Plans | GoLite Mobile",
    description:
      "GoLite Mobile business mobile phone plans keep your team connected with flexible lines, shared data, unlimited talk & text, and affordable pricing for work.",
  },

  "/community-plans": {
    title: "Affordable Community Mobile Plans | GoLite Mobile",
    description:
      "GoLite Mobile community mobile plans offer affordable prepaid options with nationwide coverage and perks for travelers, students, seniors, veterans and more.",
  },

  "/login": {
    title: "GoLite Mobile | Login to Manage Your Services",
    description:
      "Log in to your GoLite Mobile account now to manage your services, view and pay bills, track your usage and enjoy full control over your mobile plan.",
  },

  "/checkout": {
    title: "GoLite Mobile Checkout | Secure & Fast Order Completion",
    description:
      "Securely complete your GoLite Mobile order with our fast checkout. Activate your prepaid plan in minutes and enjoy reliable nationwide coverage.",
  },

  "/contact-us": {
    title: "Contact Us | GoLite Mobile Customer Support",
    description:
      "Need assistance from GoLite Mobile? Contact our support team for help with accounts, billing, or services.",
  },

  "/all-plans": {
    title: "Best Value Mobile Plans & Pricing | GoLite Mobile",
    description:
      "Looking for the best value mobile plans? GoLite Mobile offers affordable and flexible plans with fast nationwide coverage.",
  },

  "/help-and-support": {
    title: "GoLite Mobile Help & Support | FAQs & SIM Assistance",
    description:
      "GoLite Mobile Help & Support provides assistance with account management, SIM activation, troubleshooting, and FAQs.",
  },
};

/* ====================================
   DYNAMIC METADATA GENERATOR
==================================== */

export async function generateMetadata({
  params,
}: {
  params?: { slug?: string[] };
}): Promise<Metadata> {
  const pathname = "/" + (params?.slug?.join("/") || "");

  return pageMeta[pathname] || pageMeta["/"];
}

/* ====================================
   ORIGINAL LAYOUT (UNCHANGED)
==================================== */

import SessionProviderClient from "./providers/SessionProviderClient";
import SessionSync from "./providers/SessionSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <SessionProviderClient>
          <SessionSync />
          {children}
        </SessionProviderClient>
      </body>
    </html>
  );
}