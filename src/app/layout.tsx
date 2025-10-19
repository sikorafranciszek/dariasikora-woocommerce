import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// @ts-ignore
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { CookieBanner } from "@/components/cookie/cookie-banner";
import { CookieSettingsButton } from "@/components/cookie/cookie-settings-button";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Primitive Dolls - Handmade Primitive Dolls",
  description:
    "Unique handmade primitive dolls crafted with passion and traditional techniques by Daria Sikora",
  keywords: [
    "primitive dolls",
    "handmade dolls",
    "art dolls",
    "handcrafted",
    "daria sikora",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <NuqsProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" richColors />
          <CookieBanner />
          <CookieSettingsButton />
        </NuqsProvider>
      </body>
    </html>
  );
}
