import Providers from "@/lib/Providers/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare",
  description:
    "HealthCare is a robust and comprehensive healthcare management system designed to streamline communication and appointment processes between patients, doctors, and administrators.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={roboto.className}>
          <AppRouterCacheProvider>
            <>
              <Toaster position="top-center" />
              {children}
            </>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
