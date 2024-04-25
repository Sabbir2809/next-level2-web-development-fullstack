import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogiz",
  description:
    "Welcome to Blogiz – where innovation meets imagination in the dynamic realm of technology, offering a thrilling journey through the latest trends and groundbreaking discoveries in the world of tech!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body className={inter.className}>
          <Header></Header>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </Providers>
  );
}
