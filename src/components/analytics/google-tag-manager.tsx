"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useGoogleAnalytics } from "@/hooks/use-google-analytics";

interface GoogleTagManagerProps {
  gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const analyticsEnabled = useGoogleAnalytics();

  useEffect(() => {
    if (typeof window !== "undefined" && gtmId) {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];

      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }

      // Make gtag available globally
      (window as any).gtag = gtag;

      // Set default consent mode
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        wait_for_update: 500,
      });

      gtag("js", new Date());
      gtag("config", gtmId, {
        anonymize_ip: true,
        cookie_flags: "SameSite=Lax;Secure",
      });

      // Update consent if analytics is enabled
      if (analyticsEnabled) {
        gtag("consent", "update", {
          analytics_storage: "granted",
        });
      }
    }
  }, [gtmId, analyticsEnabled]);

  // Always load the script, but only initialize with consent
  if (!gtmId) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
      strategy="afterInteractive"
    />
  );
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
