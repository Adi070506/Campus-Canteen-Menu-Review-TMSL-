import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/bottom-nav";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Canteen Pulse",
  description: "Real-time campus dining updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <main className="min-h-screen">{children}</main>
          <Toaster />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
