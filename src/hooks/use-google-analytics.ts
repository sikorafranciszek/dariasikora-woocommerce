"use client";

import { useEffect, useState } from "react";
import { hasConsentForCategory } from "@/lib/cookie-consent";

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
    // Listen for custom consent events
    window.addEventListener("consentUpdated", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleConsentChange);
      window.removeEventListener("consentUpdated", handleConsentChange);
    };
  }, []);

  return analyticsEnabled;
}
