"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  // This would typically come from the URL query params or context
  const userEmail = "user@example.com";

  async function handleVerify(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      // In a real application, you would:
      // 1. Send the OTP to your backend for verification
      // 2. Update the user's email verification status in your database
      // 3. Redirect to the appropriate page or show success message

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, let's consider "123456" as the correct OTP
      if (otp === "123456") {
        setIsSuccess(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendCode() {
    setIsResending(true);
    setError(null);

    try {
      // In a real application, you would:
      // 1. Generate a new OTP
      // 2. Send it to the user's email
      // 3. Update the OTP in your database

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setError("A new verification code has been sent to your email.");
    } catch (err) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit verification code to your email address
          </CardDescription>
        </CardHeader>

        {isSuccess ? (
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Email Verified</AlertTitle>
              <AlertDescription className="text-green-700">
                Your email has been successfully verified. You can now continue using your account.
              </AlertDescription>
            </Alert>
            <div className="text-center pt-2">
              <Button asChild className="w-full">
                <Link to="/admin/dashboard">Continue to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        ) : (
          <form action={handleVerify}>
            <CardContent className="space-y-4">
              {error && (
                <Alert
                  variant={error.includes("has been sent") ? "default" : "destructive"}
                  className={error.includes("has been sent") ? "border-blue-200 bg-blue-50" : ""}
                >
                  {error.includes("has been sent") ? (
                    <Mail className="h-4 w-4 text-blue-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{error.includes("has been sent") ? "Code Sent" : "Error"}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userEmail}
                  disabled
                  className="bg-gray-100 text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex justify-center py-2">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading || otp.length !== 6}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
              <div className="text-center text-sm">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-primary hover:underline disabled:opacity-70"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
