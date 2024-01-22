import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/features/navbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rafee and Ellie's wedding",
  description: "Save the date! 28th October 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"max-w-4xl mx-auto p-5 sm:p-10 font-mono bg-amber-50"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
