import Providers from "@/lib/Providers/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Toaster } from "sonner";


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Providers>
      <html lang="en">
        {/* <body className={inter.className}> */}
        <AppRouterCacheProvider>
          <>
            <Toaster position="top-center" />
            {children}
          </>
        </AppRouterCacheProvider>
      </body>
    </html>);
  Providers >
    ;
  ;
}
