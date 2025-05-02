"use client";

import { useEffect, useState, useTransition } from "react";
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
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

import { forgetPasswordVerification } from "@/services/auth";

export default function ResetPasswordVerifyPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [payload, setPayload] = useState({
    email: state?.email || "",
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ msg: "", isSuccess: false, error: "" });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const { data } = await forgetPasswordVerification(payload);
        setStatus((prev) => {
          return { ...prev, isSuccess: true, msg: data?.data };
        });
      } catch (e: any) {
        setStatus((prev) => {
          return {
            ...prev,
            isSuccess: false,
            error: e?.response?.data?.err || "Something went wrong",
          };
        });
      } finally {
        setTimeout(() => {
          setPayload({
            email,
            token: "",
            password: "",
            confirmPassword: "",
          });
          setStatus((prev) => {
            return { ...prev, msg: "", error: "" };
          });
        }, 4000);
      }
    });
  };

  useEffect(() => {
    if (!state?.email) {
      navigate("/auth/login");
    }
  }, [navigate, state?.email]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-center">
            Enter the verification code sent to your email and create a new password
          </CardDescription>
        </CardHeader>

        {status?.isSuccess ? (
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Password Reset Successful</AlertTitle>
              <AlertDescription className="text-green-700">
                Your password has been successfully reset. You can now log in with your new
                password.
              </AlertDescription>
            </Alert>
            <div className="text-center pt-2">
              <Button asChild className="w-full">
                <Link to="/auth/login">Go to Login</Link>
              </Button>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardContent className="space-y-4">
              {status?.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{status?.error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={payload?.email}
                  disabled
                  className="bg-gray-100 text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="flex justify-center py-2">
                  <InputOTP
                    maxLength={6}
                    value={payload?.token}
                    onChange={(e: any) => {
                      setPayload((prev) => {
                        return { ...prev, token: e };
                      });
                    }}
                  >
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

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={payload?.password}
                    autoComplete="on"
                    onChange={(e: any) =>
                      setPayload((prev) => {
                        return { ...prev, password: e?.target?.value };
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="on"
                    type={showConfirmPassword ? "text" : "password"}
                    value={payload?.confirmPassword}
                    onChange={(e: any) =>
                      setPayload((prev) => {
                        return { ...prev, confirmPassword: e?.target?.value };
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mt-4">
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? "Resetting Password..." : "Reset Password"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
