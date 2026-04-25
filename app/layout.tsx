import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import TopProgressBar from "@/components/TopProgressBar";
import { LoadingProvider } from "@/context/LoadingContext";
import BmoLoader from "@/components/BmoLoader";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "B-MO | Paiement Digital au Bénin",
  description:
    "Solution de mobile banking interopérable avec MTN MoMo, Moov Money et Celtiis Cash. Transférez, payez vos factures et gérez votre argent en toute sécurité.",
  icons: {
    icon: "/bmo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <LoadingProvider>
          <BmoLoader />
          <TopProgressBar />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
