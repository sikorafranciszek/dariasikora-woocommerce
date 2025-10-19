"use client";

import { useEffect, useState } from "react";
import {
  getConsentPreferences,
  hasConsentForCategory,
} from "@/lib/cookie-consent";

export function useGoogleAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const hasAnalyticsConsent = hasConsentForCategory("analytics");
    setAnalyticsEnabled(hasAnalyticsConsent);

    // Listen for consent changes
    const handleConsentChange = () => {
      const hasAnalytics = hasConsentForCategory("analytics");
      const hasMarketing = hasConsentForCategory("functional"); // Using functional for marketing
      setAnalyticsEnabled(hasAnalytics);

      if (typeof window !== "undefined" && window.gtag) {
        // Update consent mode
        window.gtag("consent", "update", {
          analytics_storage: hasAnalytics ? "granted" : "denied",
          ad_storage: hasMarketing ? "granted" : "denied",
        });
      }
    };

    // Listen for storage changes (when consent is updated)
    window.addEventListener("storage", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleConsentChange);
    };
  }, []);

  return analyticsEnabled;
}
