interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(
  token: string,
  ip?: string
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY not found in environment variables");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const result: TurnstileResponse = await response.json();

    if (!result.success) {
      console.error("Turnstile verification failed:", result["error-codes"]);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return false;
  }
}
