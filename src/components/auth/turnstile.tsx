"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

export function TurnstileComponent({
  onVerify,
  onError,
  onExpire,
  className,
}: TurnstileComponentProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.warn(
      "Turnstile site key not found. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY to your environment variables."
    );
    return null;
  }

  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: "auto",
          size: "normal",
        }}
      />
    </div>
  );
}
