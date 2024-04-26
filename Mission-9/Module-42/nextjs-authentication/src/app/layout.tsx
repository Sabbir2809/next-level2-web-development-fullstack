import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Authentication",
  description: "Authentication",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <div className="min-h-screen w-[90%] mx-auto">{children}</div>
      </body>
    </html>
  );
}
