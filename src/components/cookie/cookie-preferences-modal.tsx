'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  BarChart3,
  Wrench,
  CreditCard,
  Info,
} from 'lucide-react';
import type { ConsentPreferences } from '@/lib/cookie-consent';
import {
  saveConsentPreferences,
  acceptAllCookies,
  getConsentPreferences,
} from '@/lib/cookie-consent';

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CookieCategoryInfo {
  id: keyof ConsentPreferences;
  title: string;
  description: string;
  required: boolean;
  icon: React.ReactNode;
  examples: string[];
}

const cookieCategories: CookieCategoryInfo[] = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    description:
      'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions you make such as setting your privacy preferences, logging in, or filling in forms.',
    required: true,
    icon: <Shield className="h-5 w-5" />,
    examples: ['Session management', 'Authentication', 'Security', 'Cookie consent'],
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    description:
      'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.',
    required: false,
    icon: <BarChart3 className="h-5 w-5" />,
    examples: ['Google Analytics', 'Cloudflare Analytics', 'Sentry Error Tracking'],
  },
  {
    id: 'functional',
    title: 'Functional Cookies',
    description:
      'These cookies enable enhanced functionality and personalization, such as videos and live chats. They may be set by us or by third-party providers whose services we have added to our pages.',
    required: false,
    icon: <Wrench className="h-5 w-5" />,
    examples: ['YouTube videos', 'Vimeo videos', 'Google reCAPTCHA'],
  },
  {
    id: 'payment',
    title: 'Payment Cookies',
    description:
      'These cookies are necessary to process secure payments and prevent fraud. We use Stripe for payment processing, which requires these cookies under legitimate interest to ensure transaction security.',
    required: false,
    icon: <CreditCard className="h-5 w-5" />,
    examples: ['Stripe payment processing', 'Fraud prevention', 'Transaction security'],
  },
];

export function CookiePreferencesModal({
  open,
  onOpenChange,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    functional: false,
    payment: false,
  });

  // Load current preferences when modal opens
  useEffect(() => {
    if (open) {
      const currentConsent = getConsentPreferences();
      if (currentConsent) {
        setPreferences(currentConsent.preferences);
      }
    }
  }, [open]);

  const handleToggle = (category: keyof ConsentPreferences, enabled: boolean) => {
    if (category === 'essential') return; // Cannot disable essential cookies

    setPreferences((prev) => ({
      ...prev,
      [category]: enabled,
    }));
  };

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences);
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    acceptAllCookies();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-6 w-6 text-primary" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. You can choose which categories of cookies to
            accept. Essential cookies cannot be disabled as they are required for the
            website to function properly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {cookieCategories.map((category, index) => (
            <div key={category.id}>
              {index > 0 && <Separator className="mb-6" />}

              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1 text-primary">{category.icon}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={category.id}
                          className="text-base font-semibold cursor-pointer"
                        >
                          {category.title}
                        </Label>
                        {category.required && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <Switch
                    id={category.id}
                    checked={preferences[category.id]}
                    onCheckedChange={(checked) => handleToggle(category.id, checked)}
                    disabled={category.required}
                    className="mt-1"
                  />
                </div>

                {/* Examples */}
                <div className="ml-8 pl-3 border-l-2 border-muted">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Used for: </span>
                      {category.examples.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleSavePreferences}
            className="w-full sm:w-auto"
          >
            Save Preferences
          </Button>
          <Button
            type="button"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto"
          >
            Accept All Cookies
          </Button>
        </DialogFooter>

        <p className="text-xs text-muted-foreground text-center pt-2">
          For more information, please read our{' '}
          <a href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
