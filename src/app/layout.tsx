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
  title: "My Primitive Dolls - Unique Handmade Art Dolls by Daria Sikora",
  description:
    "Discover unique handmade primitive dolls crafted with passion and traditional techniques. Each doll is one-of-a-kind, created by Polish artist Daria Sikora. Worldwide shipping available.",
  keywords: [
    "primitive dolls",
    "handmade dolls",
    "art dolls",
    "handcrafted dolls",
    "daria sikora",
    "unique dolls",
    "collectible dolls",
    "folk art dolls",
  ],
  authors: [{ name: "Daria Sikora" }],
  creator: "Daria Sikora",
  publisher: "My Primitive Dolls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dariasikora.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "My Primitive Dolls - Unique Handmade Art Dolls",
    description: "Discover unique handmade primitive dolls crafted with passion and traditional techniques. Each doll is one-of-a-kind, created by Polish artist Daria Sikora.",
    url: 'https://dariasikora.pl',
    siteName: 'My Primitive Dolls',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "My Primitive Dolls - Unique Handmade Art Dolls",
    description: "Discover unique handmade primitive dolls crafted with passion and traditional techniques by Daria Sikora.",
    creator: '@myprimitivedolls',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
