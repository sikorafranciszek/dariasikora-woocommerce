'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CookiePreferencesModal } from './cookie-preferences-modal';
import { Cookie, Settings, X } from 'lucide-react';
import {
  shouldShowConsentBanner,
  acceptAllCookies,
  rejectAllCookies,
} from '@/lib/cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if banner should be shown after component mounts
    const shouldShow = shouldShowConsentBanner();
    if (shouldShow) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    closeBanner();
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    closeBanner();
  };

  const handleCustomize = () => {
    setShowPreferences(true);
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handlePreferencesClose = (open: boolean) => {
    setShowPreferences(open);
    if (!open) {
      // If preferences were saved, close the banner too
      if (!shouldShowConsentBanner()) {
        closeBanner();
      }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-transform duration-300 ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <Card className="max-w-5xl mx-auto shadow-2xl border-2">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Icon and Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Cookie className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                      We Value Your Privacy
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      We use cookies to enhance your browsing experience, serve
                      personalized content, and analyze our traffic. By clicking "Accept
                      All", you consent to our use of cookies. You can customize your
                      preferences or reject non-essential cookies.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Read our{' '}
                      <a
                        href="/cookie-policy"
                        className="text-primary hover:underline font-medium"
                      >
                        Cookie Policy
                      </a>{' '}
                      and{' '}
                      <a
                        href="/privacy-policy"
                        className="text-primary hover:underline font-medium"
                      >
                        Privacy Policy
                      </a>{' '}
                      for more information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 sm:min-w-[200px]">
                <Button
                  onClick={handleAcceptAll}
                  className="w-full shadow-sm"
                  size="lg"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleCustomize}
                  variant="ghost"
                  className="w-full"
                  size="lg"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        open={showPreferences}
        onOpenChange={handlePreferencesClose}
      />
    </>
  );
}
