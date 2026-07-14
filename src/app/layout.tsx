import type { Metadata } from "next";
import {  Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-board",
});

// const syne = Syne({
//   subsets: ["latin"],
//   weight: ["600", "700", "800"],
//   variable: "--font-syne",
//   display: "swap",
// });

// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-dm-sans",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "HireZen — AI Job Application Tracker",
  description: "Track applications, ace interviews, land offers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", spaceMono.variable, fraunces.variable)}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}