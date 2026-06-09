import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Monika AI Prototype",
  description:
    "TRRF LungFit prototype connecting patients, doctors, and TRRF staff through supportive check-ins, structured data, and dashboard views."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="page-backdrop" />
        <div className="page-shell">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
