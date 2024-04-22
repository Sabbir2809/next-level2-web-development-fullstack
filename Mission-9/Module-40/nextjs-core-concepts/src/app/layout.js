import Navbar from "@/components/Navbar";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Next.Js Core Concepts",
  description: "core fundamental concepts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={roboto.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
