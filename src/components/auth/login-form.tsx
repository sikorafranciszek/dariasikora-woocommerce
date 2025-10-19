"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TurnstileComponent } from "./turnstile";
import { toast } from "sonner";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      toast.error("Please complete the security verification");
      return;
    }

    setIsLoading(true);

    try {
      await signIn.email({
        email,
        password,
      });

      toast.success("Logged in successfully!");
      router.push("/account");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error. Check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <TurnstileComponent
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => {
              setTurnstileToken(null);
              toast.error("Security verification failed. Please try again.");
            }}
            onExpire={() => {
              setTurnstileToken(null);
              toast.warning(
                "Security verification expired. Please verify again."
              );
            }}
            className="flex justify-center"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !turnstileToken}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
