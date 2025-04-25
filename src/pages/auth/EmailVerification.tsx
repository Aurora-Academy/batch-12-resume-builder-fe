import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const userEmail = state?.email;

  const handleVerify = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        email: userEmail,
        otp,
      };
      const { data } = await axiosInstance.post(`${URLS.USERS}/email/verify`, payload);
      if (data?.data) {
        setIsSuccess(true);
      }
    } catch (e: any) {
      setError(e?.response?.data?.err);
    } finally {
      setTimeout(() => {
        setOtp("");
        setError("");
        setIsSuccess(false);
      }, 5000);
    }
  };

  async function handleResendCode() {
    setError("");
  }

  useEffect(() => {
    if (!state?.email) {
      navigate("/auth/login");
    }
  }, [state, navigate]);

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
                <Link to="/auth/login">Login to get started</Link>
              </Button>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={(e) => handleVerify(e)}>
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
              <Button className="w-full" type="submit" disabled={otp.length !== 6}>
                {/* {isLoading ? "Verifying..." : "Verify Email"} */}
                Verify Email
              </Button>
              <div className="text-center text-sm">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-primary hover:underline disabled:opacity-70"
                >
                  {/* {isResending ? "Sending..." : "Resend Code"} */}
                  Resend Code
                </button>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
