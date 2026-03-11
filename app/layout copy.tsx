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

export const metadata: Metadata = {
  title: "GoLite Mobile | Best Mobile Plans USA with Global Coverage",
  description: "GoLite Mobile offers the best mobile plans USA with unlimited international calls, 5G data, global coverage &amp; flexible plans for every user’s needs.",
};

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
