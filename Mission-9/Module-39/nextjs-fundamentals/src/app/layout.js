import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.Js Fundamentals",
  description: "Fundamentals Concept",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
