'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CookiePreferencesModal } from './cookie-preferences-modal';
import { Cookie } from 'lucide-react';
import { hasConsent } from '@/lib/cookie-consent';

export function CookieSettingsButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Only show the button if consent has been given
    setIsVisible(hasConsent());

    // Listen for consent updates
    const handleConsentUpdate = () => {
      setIsVisible(hasConsent());
    };

    window.addEventListener('consentUpdated', handleConsentUpdate);

    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <Button
        onClick={() => setShowPreferences(true)}
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background border-2"
        aria-label="Cookie Settings"
        title="Cookie Settings"
      >
        <Cookie className="h-5 w-5" />
      </Button>

      <CookiePreferencesModal
        open={showPreferences}
        onOpenChange={setShowPreferences}
      />
    </>
  );
}
