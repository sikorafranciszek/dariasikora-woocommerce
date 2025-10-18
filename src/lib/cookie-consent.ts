import Cookies from 'js-cookie';

/**
 * Cookie categories for GDPR compliance
 */
export type CookieCategory = 'essential' | 'analytics' | 'functional' | 'payment';

/**
 * Consent preferences for each cookie category
 */
export interface ConsentPreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  functional: boolean;
  payment: boolean;
}

/**
 * Stored consent data
 */
export interface ConsentData {
  preferences: ConsentPreferences;
  timestamp: number;
  version: string; // Track consent version for GDPR compliance
}

// Constants
const CONSENT_COOKIE_NAME = 'cookie_consent';
const CONSENT_STORAGE_KEY = 'cookie_consent_preferences';
const CONSENT_VERSION = '1.0';
const COOKIE_EXPIRY_DAYS = 365;

/**
 * Default consent preferences (all opt-in except essential)
 */
const DEFAULT_PREFERENCES: ConsentPreferences = {
  essential: true, // Always enabled
  analytics: false,
  functional: false,
  payment: false,
};

/**
 * Get current consent preferences from localStorage and cookie
 * Returns null if consent has not been given
 */
export function getConsentPreferences(): ConsentData | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try localStorage first (more reliable)
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const data: ConsentData = JSON.parse(stored);
      return data;
    }

    // Fallback to cookie
    const cookieValue = Cookies.get(CONSENT_COOKIE_NAME);
    if (cookieValue) {
      const data: ConsentData = JSON.parse(cookieValue);
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error reading consent preferences:', error);
    return null;
  }
}

/**
 * Save consent preferences to both localStorage and cookie
 */
export function saveConsentPreferences(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') return;

  const consentData: ConsentData = {
    preferences: {
      ...preferences,
      essential: true, // Always ensure essential is true
    },
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  try {
    // Save to localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));

    // Save to cookie
    Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(consentData), {
      expires: COOKIE_EXPIRY_DAYS,
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    });

    // Initialize services based on consent
    initializeServices(preferences);

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: preferences }));
  } catch (error) {
    console.error('Error saving consent preferences:', error);
  }
}

/**
 * Check if consent has been given
 */
export function hasConsent(): boolean {
  return getConsentPreferences() !== null;
}

/**
 * Check if a specific category has consent
 */
export function hasConsentForCategory(category: CookieCategory): boolean {
  const consent = getConsentPreferences();
  if (!consent) return category === 'essential'; // Only essential cookies by default
  return consent.preferences[category];
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  const preferences: ConsentPreferences = {
    essential: true,
    analytics: true,
    functional: true,
    payment: true,
  };
  saveConsentPreferences(preferences);
}

/**
 * Reject all non-essential cookies
 */
export function rejectAllCookies(): void {
  const preferences: ConsentPreferences = {
    essential: true,
    analytics: false,
    functional: false,
    payment: false,
  };
  saveConsentPreferences(preferences);
}

/**
 * Clear all consent data
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    Cookies.remove(CONSENT_COOKIE_NAME);
  } catch (error) {
    console.error('Error clearing consent:', error);
  }
}

/**
 * Initialize third-party services based on consent
 */
function initializeServices(preferences: ConsentPreferences): void {
  // Google Analytics
  if (preferences.analytics) {
    initializeGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  // Other services can be initialized here based on preferences
  // For example: Sentry, Cloudflare Analytics, etc.
}

/**
 * Initialize Google Analytics (GA4)
 * Call this only when analytics consent is given
 */
export function initializeGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Check if already loaded
  if ((window as any).gtag) {
    console.log('Google Analytics already initialized');
    return;
  }

  try {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR requirement
      cookie_flags: 'SameSite=Lax;Secure',
    });

    console.log('Google Analytics initialized');
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
}

/**
 * Disable Google Analytics
 */
export function disableGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_MEASUREMENT_ID) return;

  // Set the disable property
  (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  // Remove GA cookies
  const gaCookies = ['_ga', '_gat', '_gid'];
  for (const cookie of gaCookies) {
    Cookies.remove(cookie, { path: '/', domain: window.location.hostname });
  }
}

/**
 * Track a custom event with Google Analytics (only if consent given)
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (!hasConsentForCategory('analytics')) {
    console.log('Analytics consent not given, event not tracked:', eventName);
    return;
  }

  if (typeof window === 'undefined' || !(window as any).gtag) return;

  try {
    (window as any).gtag('event', eventName, eventParams);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

/**
 * Get cookie consent banner visibility
 * Returns true if banner should be shown
 */
export function shouldShowConsentBanner(): boolean {
  return !hasConsent();
}
