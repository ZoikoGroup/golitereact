import Script from "next/script";
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
import Header from "./components/Header";
import Footer from "./components/Footer";

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

          {/* ✅ HEADER */}
          <Header />

          {/* ✅ PAGE CONTENT */}
          <main>{children}</main>

          {/* ✅ FOOTER */}
          <Footer />

        </SessionProviderClient>

        {/* Tawk.to Live Chat */}
        <Script id="tawk-chat" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),
            s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69493c42c63f76197c83bddc/1jd316p7t';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}