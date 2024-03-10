import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/features/nav/navbar";
import { ReactNode } from "react";
import { Marcellus as FontSerif } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rafee and Ellie's wedding",
  description: "Save the date! 28th October 2024",
};

const fontSerif = FontSerif({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "max-w-4xl mx-auto p-5 sm:p-10 font-serif bg-amber-50",
          fontSerif.variable,
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
